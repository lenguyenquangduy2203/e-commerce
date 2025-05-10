# customer_analysis/processor.py
from datetime import datetime, timedelta
from collections import defaultdict
from handler import fetch_customer_orders

def classify_customers(days=30):
    raw_data = fetch_customer_orders()
    cutoff = datetime.now() - timedelta(days=days)
    stats = defaultdict(int)

    user_first_order = {}

    for user_id, first_order, order_date in raw_data:
        first_dt = datetime.strptime(first_order, '%Y-%m-%d')
        order_dt = datetime.strptime(order_date, '%Y-%m-%d')

        if user_id not in user_first_order:
            user_first_order[user_id] = first_dt

        if order_dt >= cutoff:
            if first_dt >= cutoff:
                stats['New'] += 1
            else:
                stats['Returning'] += 1

    return stats
