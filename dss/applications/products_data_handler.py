import pandas as pd

def load_products_data(file_path='products.csv'):
    df = pd.read_csv(file_path)
    df.dropna(subset=["customer_id", "product_amount", "product_date"], inplace=True)
    df["product_date"] = pd.to_datetime(df["product_date"])
    df["product_amount"] = pd.to_numeric(df["product_amount"])
    return df 