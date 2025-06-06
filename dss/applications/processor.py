from typing import List, Dict

def calculate_user_type_percentages(data: List[Dict]) -> Dict[str, float]:
    """
    Tính tỷ lệ phần trăm từng loại khách hàng dựa trên tổng amount.

    Args:
        data (List[Dict]): Danh sách dict với keys: 'userType' (str), 'amount' (int/float hoặc dict)

    Returns:
        Dict[str, float]: {'New': x%, 'Returning': y%, ...}
    """
    user_type_totals: Dict[str, float] = {}

    for entry in data:
        # Hỗ trợ cả snake_case và camelCase
        user_type = entry.get("user_type") or entry.get("userType")
        amount = entry.get("amount")

        # Nếu amount là dict, ví dụ {"value": 123}, thì lấy ra giá trị
        if isinstance(amount, dict):
            amount = amount.get("value")

        if isinstance(user_type, str) and isinstance(amount, (int, float)):
            user_type_totals[user_type] = user_type_totals.get(user_type, 0) + amount

    total_amount = sum(user_type_totals.values())

    if total_amount == 0:
        return {k: 0.0 for k in user_type_totals}

    return {
        user_type: round(amount / total_amount * 100, 2)
        for user_type, amount in user_type_totals.items()
    }
