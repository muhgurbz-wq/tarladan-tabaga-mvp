from __future__ import annotations

import html as html_lib
import json
import re
from datetime import datetime, timezone
from io import StringIO
from pathlib import Path

import pandas as pd
import requests

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "prices.json"
UA = "TarladanTabaga-MVP/1.0 (+https://github.com/muhgurbz-wq/tarladan-tabaga-mvp)"
HKS_HOME = "https://www.hal.gov.tr/"
HKS_DETAIL = "https://www.hal.gov.tr/Sayfalar/FiyatDetaylari.aspx"
TOBB_CEVIZ_URL = "https://borsa.tobb.org.tr/fiyat_urun3.php?alt_kod=801&ana_kod=9"
TOBB_HOME = "https://borsa.tobb.org.tr/"


def fetch(url: str) -> str:
    r = requests.get(url, headers={"User-Agent": UA}, timeout=45)
    r.raise_for_status()
    return r.text


def clean_text(raw: str) -> str:
    text = re.sub(r"<script\b[^>]*>.*?</script>", " ", raw, flags=re.I | re.S)
    text = re.sub(r"<style\b[^>]*>.*?</style>", " ", text, flags=re.I | re.S)
    text = re.sub(r"<[^>]+>", " ", text)
    text = html_lib.unescape(text).replace("\xa0", " ")
    return re.sub(r"\s+", " ", text).strip()


def tr_decimal(value):
    if value is None:
        return None
    s = str(value).strip().replace("\xa0", " ")
    s = re.sub(r"[^0-9,.-]", "", s)
    if not s:
        return None
    if "," in s:
        s = s.replace(".", "").replace(",", ".")
    try:
        return float(s)
    except ValueError:
        return None


def bulletin_date(raw: str):
    text = clean_text(raw)
    m = re.search(r"B[üu]lten Tarihi\s*:?\s*(\d{1,2}\.\d{1,2}\.\d{4})", text, re.I)
    if not m:
        return None
    return datetime.strptime(m.group(1), "%d.%m.%Y").strftime("%Y-%m-%d")


def hks_home_price(text: str, product: str, variety: str):
    pattern = rf"{re.escape(product)}\s*\(\s*{re.escape(variety)}\s*\)\s*\(\s*Kg Fiyatı\s*\)\s*([0-9.,]+)\s*TL"
    m = re.search(pattern, text, re.I)
    return tr_decimal(m.group(1)) if m else None


def flatten(df: pd.DataFrame) -> pd.DataFrame:
    if isinstance(df.columns, pd.MultiIndex):
        df.columns = [" ".join(str(x) for x in c if str(x) != "nan").strip() for c in df.columns]
    else:
        df.columns = [str(c).strip() for c in df.columns]
    return df


def tobb_ceviz_price(raw: str):
    tables = pd.read_html(StringIO(raw), decimal=",", thousands=".")
    table = None
    for df in tables:
        df = flatten(df)
        names = " | ".join(df.columns).upper()
        if "BORSA ADI" in names and "ORTALAMA" in names:
            table = df
            break
    if table is None:
        raise RuntimeError("TOBB ceviz fiyat tablosu bulunamadı")
    avg_col = next(c for c in table.columns if "ORTALAMA" in c.upper())
    date_col = next(c for c in table.columns if "SON İŞLEM TARİHİ" in c.upper())
    vals, dates = [], []
    for _, row in table.iterrows():
        raw_value = row.get(avg_col)
        if isinstance(raw_value, (int, float)) and pd.notna(raw_value):
            v = float(raw_value)
        else:
            v = tr_decimal(raw_value)
        if v and 0 < v < 100000:
            vals.append(v)
        m = re.search(r"(\d{2}\.\d{2}\.\d{4})", str(row.get(date_col, "")))
        if m:
            dates.append(datetime.strptime(m.group(1), "%d.%m.%Y"))
    if not vals:
        return None, None
    latest = max(dates).strftime("%Y-%m-%d") if dates else None
    return round(sum(vals) / len(vals), 2), latest


def main():
    now = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    previous = json.loads(OUT.read_text()) if OUT.exists() else {"products": {}}
    products = previous.get("products", {})
    sources = {
        "hks": {"ok": False, "name": "T.C. Ticaret Bakanlığı Hal Kayıt Sistemi", "url": HKS_DETAIL},
        "tobb": {"ok": False, "name": "TOBB Ticaret Borsaları Ürün Fiyat Bilgileri", "url": TOBB_HOME},
    }

    try:
        home_raw = fetch(HKS_HOME)
        detail_raw = fetch(HKS_DETAIL)
        home_text = clean_text(home_raw)
        ddate = bulletin_date(detail_raw) or datetime.now(timezone.utc).strftime("%Y-%m-%d")
        mappings = {
            "domates": ("DOMATES", "DİĞER", "DOMATES / DİĞER"),
            "kapya_biber": ("BİBER SALÇALIK (KAPYA)", "BİBER SALÇALIK (KAPYA)", "BİBER SALÇALIK (KAPYA)"),
            "elma": ("ELMA", "DİĞER", "ELMA / DİĞER"),
        }
        found = 0
        for key, (product, variety, label) in mappings.items():
            value = hks_home_price(home_text, product, variety)
            if value is not None and value > 0:
                products[key] = {
                    "official_avg": round(value, 2),
                    "unit": "kg",
                    "source": "hks",
                    "source_name": "Ticaret Bakanlığı HKS",
                    "source_product": label,
                    "data_date": ddate,
                }
                found += 1
        if found != len(mappings):
            missing = [k for k in mappings if products.get(k, {}).get("data_date") != ddate]
            raise RuntimeError(f"HKS ürün eşlemesi eksik: {missing}")
        sources["hks"]["ok"] = True
        sources["hks"]["data_date"] = ddate
    except Exception as exc:
        sources["hks"]["error"] = str(exc)[:240]

    try:
        raw = fetch(TOBB_CEVIZ_URL)
        value, ddate = tobb_ceviz_price(raw)
        if value is None:
            raise RuntimeError("TOBB ceviz ortalama fiyatı alınamadı")
        products["ceviz"] = {
            "official_avg": value,
            "unit": "kg",
            "source": "tobb",
            "source_name": "TOBB Ticaret Borsaları",
            "source_product": "CEVİZ KABUKLU",
            "data_date": ddate,
        }
        sources["tobb"]["ok"] = True
        sources["tobb"]["data_date"] = ddate
    except Exception as exc:
        sources["tobb"]["error"] = str(exc)[:240]

    products.setdefault("bal", {
        "official_avg": None,
        "unit": "kg",
        "source": None,
        "source_name": "Uygun resmi canlı kaynak aranıyor",
        "source_product": "BAL",
        "data_date": None,
    })

    payload = {
        "schema_version": 1,
        "generated_at": now,
        "pricing_rule": {
            "name": "Tarladan Tabağa Adil Fiyat",
            "formula": "farmerAsk + 0.40 * (officialReference - farmerAsk)",
            "condition": "Sadece farmerAsk < officialReference ise öneri üretilir.",
            "note": "Çiftçi teklifinin üstünde, resmi referansın orta noktasının altında öneri üretir; gerçek lojistik/platform maliyeti pilot verisiyle ayrıca doğrulanmalıdır."
        },
        "sources": sources,
        "products": products,
        "disclaimer": "HKS verileri bilgi amaçlıdır ve kaynak sistemde hata ihtimali bildirilmektedir. TOBB verileri ilgili ticaret borsalarınca girilir."
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps({"generated_at": now, "sources": sources, "products": products}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
