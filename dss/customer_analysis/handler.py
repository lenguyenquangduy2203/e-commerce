# customer_analysis/handler.py
import sqlite3  # or use the correct DB client

def fetch_customer_orders(db_path='path_to_your_db.sqlite'):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    query = """
        SELECT user_id, MIN(order_date) as first_order, order_date
        FROM orders
        GROUP BY user_id, order_date
        ORDER BY order_date DESC;
    """
    cursor.execute(query)
    rows = cursor.fetchall()
    conn.close()

    return rows
