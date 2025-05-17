import pandas as pd

def load_orders(file_path):
    """Reads raw orders data from CSV."""
    try:
        orders = pd.read_csv(file_path)
        print("Orders loaded successfully.")
        return orders
    except Exception as e:
        print("Error loading orders:", e)
        return pd.DataFrame()
