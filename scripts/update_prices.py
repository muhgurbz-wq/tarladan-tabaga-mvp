from __future__ import annotations

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
HKS_URL = "https://www.hal.gov.tr/Sayfalar/FiyatDetaylari.aspx"
TOBB_CEVIZ_URL = "https://borsa.tobb.org.tr/fiyat_urun3.php?alt_kod=801&ana_kod=9"
TOBB_HOME = "https://borsa.tobb.org.tr/"


def fetch(url: str) -> str:
    r = requests.get(url, headers={"User-Agent": UA}, timeout=45)
    r.raise_for_status()
    return r.text


def tr_float(value):
    if value is None:
        return None
    if isinstance(value, (int, float)) and pd.notna(value):
        return float(value)
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


def flatten(df: pd.DataFrame) -> pd.DataFrame:
    if isinstance(df.columns, pd.MultiIndex):
        df.columns = [" ".join(str(x) for x in c if str(x) != "nan").strip() for c in df.columns]
    else:
        df.columns = [str(c).strip() for c in df.columns]
    return df


def find_table(html: str, required: tuple[str, ...]) -> pd.DataFrame:
    for table in pd.read_html(StringIO(html)):
        table = flatten(table)
        names = " | ".join(table.columns).upper()
        if all(r.upper() in names for r in required):
            return table
    raise RuntimeError(f"Required table not found: {required}")


def col(df: pd.DataFrame, needle: str) -> str:
    for c in df.columns:
        if needle.upper() in c.upper():
            return c
    raise KeyError(needle)


def bulletin_date(html: str):
    m = re.search(r"B[üu]lten Tarihi\s*:?\s*(\d{1,2}\.\d{1,2}\.\d{4})", html, re.I)
    if not m:
        return None
    d = datetime.strptime(m.group(1), "%d.%m.%Y")
    return d.strftime("%Y-%m-%d")


def hks_price(df: pd.DataFrame, product_contains: str, variety_contains: str | None = None):
    pcol = col(df, "Ürün Adı")
    ccol = col(df, "Ürün Cinsi")
    price_col = col(df, "Ortalama Fiyat")
    unit_col = col(df, "Birim Adı")
    type_col = next((c for c in df.columns if "Ürün Türü".upper() in c.upper()), None)
    x = df.copy()
    mask = x[pcol].astype(str).str.upper().str.contains(product_contains.upper(), regex=False)
    if variety_contains:
        mask &= x[ccol].astype(str).str.upper().str.contains(variety_contains.upper(), regex=False)
    mask &= x[unit_col].astype(str).str.upper().str.contains("KG", regex=False)
    if type_col:
        mask &= x[type_col].astype(str).str.upper().str.contains("GELENEKSEL", regex=False)
    rows = x[mask]
    if rows.empty:
        return None
    vals = [tr_float(v) for v in rows[price_col].tolist()]
    vals = [v for v in vals if v is not None and v > 0]
    if not vals:
        return None
    return round(sum(vals) / len(vals), 2)


def tobb_ceviz_price(html: str):
    df = find_table(html, ("Borsa Adı", "Ortalama"))
    avg_col = col(df, "Ortalama")
    date_col = col(df, "Son İşlem Tarihi")
    vals = []
    dates = []
    for _, row in df.iterrows():
        v = tr_float(row.get(avg_col))
        if v and v > 0:
            vals.append(v)
        raw_date = str(row.get(date_col, ""))
        m = re.search(r"(\d{2}\.\d{2}\.\d{4})", raw_date)
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
        "hks": {"ok": False, "name": "T.C. Ticaret Bakanlığı Hal Kayıt Sistemi", "url": HKS_URL},
        "tobb": {"ok": False, "name": "TOBB Ticaret Borsaları Ürün Fiyat Bilgileri", "url": TOBB_HOME},
    }

    try:
        html = fetch(HKS_URL)
        df = find_table(html, ("Ürün Adı", "Ortalama Fiyat"))
        ddate = bulletin_date(html)
        mappings = {
            "domates": ("DOMATES", "DİĞER", "DOMATES / DİĞER"),
            "kapya_biber": ("BİBER SALÇALIK", "KAPYA", "BİBER SALÇALIK (KAPYA)"),
            "elma": ("ELMA", "DİĞER", "ELMA / DİĞER"),
        }
        for key, (name, variety, label) in mappings.items():
            v = hks_price(df, name, variety)
            if v is not None:
                products[key] = {"official_avg": v,"unit": "kg","source": "hks","source_name": "Ticaret Bakanlığı HKS","source_product": label,"data_date": ddate}
        sources["hks"]["ok"] = True
        sources["hks"]["data_date"] = ddate
    except Exception as exc:
        sources["hks"]["error"] = str(exc)[:240]

    try:
        html = fetch(TOBB_CEVIZ_URL)
        value, ddate = tobb_ceviz_price(html)
        if value is not None:
            products["ceviz"] = {"official_avg": value,"unit": "kg","source": "tobb","source_name": "TOBB Ticaret Borsaları","source_product": "CEVİZ KABUKLU","data_date": ddate}
        sources["tobb"]["ok"] = True
        sources["tobb"]["data_date"] = ddate
    except Exception as exc:
        sources["tobb"]["error"] = str(exc)[:240]

    products.setdefault("bal", {"official_avg": None,"unit": "kg","source": None,"source_name": "Uygun resmi canlı kaynak aranıyor","source_product": "BAL","data_date": None})

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
