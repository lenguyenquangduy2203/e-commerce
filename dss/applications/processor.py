from typing import List, Dict

def calculate_user_type_percentages(data: List[Dict]) -> Dict[str, float]:
    """
    Tính tỷ lệ phần trăm từng loại khách hàng dựa trên tổng amount.

    Args:
        data (List[Dict]): Danh sách dict với keys: 'type' (str), 'amount' (int)

    Returns:
        Dict[str, float]: {'New': x%, 'Returning': y%}
    """
    total = sum(entry["amount"] for entry in data)
    if total == 0:
        return {entry["type"]: 0.0 for entry in data}

    return {
        entry["type"]: round(entry["amount"] / total * 100, 2)
        for entry in data
    }
