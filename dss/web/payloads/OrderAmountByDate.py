from typing import TypedDict


class OrderAmountByDate(TypedDict):
    # ISO 8601 datetime string e.g., "2025-04-18"
    created_date: str
    amount: int
