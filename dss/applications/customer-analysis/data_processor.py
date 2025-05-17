# data_processor.py
import pandas as pd

def process_order_volume(data):
    if not data:
        return pd.DataFrame()
    
    # Assuming API returns something like:
    # [{"month": "2024-01", "volume": 234}, ...]
    df = pd.DataFrame(data)
    df['month'] = pd.to_datetime(df['month'])
    df = df.sort_values(by='month')
    return df
