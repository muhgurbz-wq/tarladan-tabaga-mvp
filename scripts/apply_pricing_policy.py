from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PRICE_FILE = ROOT / "data" / "prices.json"
POLICY_FILE = ROOT / "data" / "pricing-policy.json"


def main() -> None:
    prices = json.loads(PRICE_FILE.read_text(encoding="utf-8"))
    policy = json.loads(POLICY_FILE.read_text(encoding="utf-8"))
    prices["pricing_rule"] = {
        "name": policy["name"],
        "farmer_sets_price": policy["farmer_sets_price"],
        "pricing_owner": policy["pricing_owner"],
        "platform_rate": policy["platform_rate"],
        "farmer_uplift_rate": policy["farmer_uplift_rate"],
        "consumer_discount_target": policy["consumer_discount_target"],
        "farmer_payout_formula": policy["calculation"]["farmer_payout"],
        "consumer_final_price_formula": policy["calculation"]["consumer_final_price"],
        "operation_share_formula": policy["calculation"]["operation_share"],
        "consumer_benefit_gate": policy["calculation"]["consumer_benefit_gate"],
    }
    PRICE_FILE.write_text(json.dumps(prices, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
