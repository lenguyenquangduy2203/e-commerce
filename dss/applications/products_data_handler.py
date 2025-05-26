import pandas as pd

def load_products_data(file_path='products.csv'):
    try:
        df = pd.read_csv(file_path)
        # Ensure required columns exist
        required_columns = ['product_name', 'product_model', 'stock_quantity', 'product_date']
        if not all(col in df.columns for col in required_columns):
            raise ValueError("Missing required columns in data")
            
        # Clean and format data
        df.dropna(subset=required_columns, inplace=True)
        df["product_date"] = pd.to_datetime(df["product_date"])
        df["stock_quantity"] = pd.to_numeric(df["stock_quantity"])
        
        # Ensure data format is consistent
        df = df.rename(columns={
            'product_name': 'productName',
            'product_model': 'productModel',
            'stock_quantity': 'quantity'
        })
        
        return df
    except Exception as e:
        print(f"Error loading data: {e}")
        return pd.DataFrame(columns=['productName', 'productModel', 'quantity', 'product_date']) 