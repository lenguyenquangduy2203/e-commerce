import pandas as pd
from datetime import datetime, timedelta

def classify_customers(orders: pd.DataFrame, days: int = 30) -> pd.DataFrame:
    """Gắn nhãn 'New' hoặc 'Returning' cho từng đơn hàng trong khoảng N ngày gần đây."""
    cutoff = datetime.now() - timedelta(days=days)
    recent_orders = orders[orders["order_date"] >= cutoff].copy()

    # Lấy ngày mua hàng đầu tiên của từng khách
    first_orders = orders.groupby("user_id")["order_date"].min()
    recent_orders["first_order_date"] = recent_orders["user_id"].map(first_orders)

    # Phân loại theo thời gian đặt hàng đầu tiên
    recent_orders["customer_type"] = recent_orders["first_order_date"].apply(
        lambda date: "New" if date >= cutoff else "Returning"
    )

    return recent_orders

def summarize_customer_types(labeled_orders: pd.DataFrame) -> dict:
    """Tính tổng số đơn hàng theo loại khách hàng."""
    return labeled_orders["customer_type"].value_counts().to_dict()
