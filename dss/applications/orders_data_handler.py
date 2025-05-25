import pandas as pd

def load_orders_data(file_path='orders.csv'):
    df = pd.read_csv(file_path)
    df.dropna(subset=["customer_id", "order_amount", "order_date"], inplace=True)
    df["order_date"] = pd.to_datetime(df["order_date"])
    df["order_amount"] = pd.to_numeric(df["order_amount"])
    return df