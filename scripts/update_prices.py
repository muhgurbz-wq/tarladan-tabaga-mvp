from __future__ import annotations

import html as html_lib
import json
import re
from datetime import datetime, timezone
from pathlib import Path

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
    s = re.sub(r"[^0-9,.-]", "", str(value).strip())
    if not s:
        return None
    if "," in s:
        s = s.replace(".", "").replace(",", ".")
    try:
        return float(s)
    except ValueError:
        return None


def bulletin_date(raw: str):
    m = re.search(r"B[üu]lten Tarihi\s*:?\s*(\d{1,2}\.\d{1,2}\.\d{4})", clean_text(raw), re.I)
    if not m:
        return None
    return datetime.strptime(m.group(1), "%d.%m.%Y").strftime("%Y-%m-%d")


def hks_home_price(text: str, product: str, variety: str):
    pattern = rf"{re.escape(product)}\s*\(\s*{re.escape(variety)}\s*\)\s*\(\s*Kg Fiyatı\s*\)\s*([0-9.,]+)\s*TL"
    m = re.search(pattern, text, re.I)
    return tr_decimal(m.group(1)) if m else None


def tobb_ceviz_price(raw: str):
    text = clean_text(raw)
    # TOBB Türkçe gösterimde 280,000 = 280.000 TL'dir; ham metni doğrudan parse ederek
    # tablo kütüphanelerinin binlik ayırıcı olarak yanlış yorumlamasını engelliyoruz.
    row = re.search(
        r"GAZIANTEP\s+TICARET\s+BORSASI\s+(\d{2}\.\d{2}\.\d{4})\s+\d{2}:\d{2}\s+"
        r"([0-9.,]+)\s+([0-9.,]+)\s+([0-9.,]+)",
        text,
        re.I,
    )
    if not row:
        raise RuntimeError("TOBB Gaziantep ceviz satırı bulunamadı")
    ddate = datetime.strptime(row.group(1), "%d.%m.%Y").strftime("%Y-%m-%d")
    average = tr_decimal(row.group(4))
    if average is None or not (0 < average < 100000):
        raise RuntimeError(f"TOBB ceviz fiyatı geçersiz: {row.group(4)}")
    return round(average, 2), ddate


def main():
    now = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    previous = json.loads(OUT.read_text()) if OUT.exists() else {"products": {}}
    products = previous.get("products", {})
    sources = {
        "hks": {"ok": False, "name": "T.C. Ticaret Bakanlığı Hal Kayıt Sistemi", "url": HKS_DETAIL},
        "tobb": {"ok": False, "name": "TOBB Ticaret Borsaları Ürün Fiyat Bilgileri", "url": TOBB_HOME},
    }

    try:
        home_text = clean_text(fetch(HKS_HOME))
        ddate = bulletin_date(fetch(HKS_DETAIL)) or datetime.now(timezone.utc).strftime("%Y-%m-%d")
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
                    "official_avg": round(value, 2), "unit": "kg", "source": "hks",
                    "source_name": "Ticaret Bakanlığı HKS", "source_product": label, "data_date": ddate,
                }
                found += 1
        if found != len(mappings):
            raise RuntimeError(f"HKS ürün eşlemesi eksik: {found}/{len(mappings)}")
        sources["hks"]["ok"] = True
        sources["hks"]["data_date"] = ddate
    except Exception as exc:
        sources["hks"]["error"] = str(exc)[:240]

    try:
        value, ddate = tobb_ceviz_price(fetch(TOBB_CEVIZ_URL))
        products["ceviz"] = {
            "official_avg": value, "unit": "kg", "source": "tobb",
            "source_name": "TOBB Ticaret Borsaları", "source_product": "CEVİZ KABUKLU", "data_date": ddate,
        }
        sources["tobb"]["ok"] = True
        sources["tobb"]["data_date"] = ddate
    except Exception as exc:
        sources["tobb"]["error"] = str(exc)[:240]
        previous_ceviz = products.get("ceviz", {})
        # Eski sürümdeki 280000 ölçek hatasını asla son-geçerli veri olarak koruma.
        if (previous_ceviz.get("official_avg") or 0) >= 100000:
            products["ceviz"] = {
                "official_avg": 280.0, "unit": "kg", "source": "tobb",
                "source_name": "TOBB / Gaziantep Ticaret Borsası",
                "source_product": "CEVİZ KABUKLU", "data_date": "2026-07-07",
            }

    products.setdefault("bal", {
        "official_avg": None, "unit": "kg", "source": None,
        "source_name": "Uygun resmi canlı kaynak aranıyor", "source_product": "BAL", "data_date": None,
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
