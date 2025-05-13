import requests
import pandas as pd
from typing import Dict, List, Optional, TypedDict

class UserAmountByType(TypedDict):
    user_type: str
    amount: int

class ProductWithStockQuantity(TypedDict):
    product_name: str
    product_model: str
    stock_quantity: int

class OrderAmountByDate(TypedDict):
    created_date: str  # ISO 8601 datetime string
    amount: int

class DataHandler:
    def __init__(self, base_url: str):
        self.base_url = base_url
        self.users_endpoint = f"{base_url}/api/v1/users"
        self.products_endpoint = f"{base_url}/api/v1/products"
        self.orders_endpoint = f"{base_url}/api/v1/orders"

    def fetch_data(self, endpoint: str, token: str) -> List[Dict]:
        """Generic method to fetch data from any endpoint"""
        headers = {"Authorization": f"Bearer {token}"}
        response = requests.get(endpoint, headers=headers)
        response.raise_for_status()
        return response.json()

    def get_user_amounts(self, token: str) -> Optional[pd.DataFrame]:
        """Get user amount data"""
        try:
            data = self.fetch_data(f"{self.users_endpoint}/amounts", token)
            return pd.DataFrame(data)
        except Exception as e:
            print(f"Error fetching user amounts: {e}")
            return None

    def get_product_stocks(self, token: str) -> Optional[pd.DataFrame]:
        """Get product stock data"""
        try:
            data = self.fetch_data(f"{self.products_endpoint}/stocks", token)
            df = pd.DataFrame(data)
            if 'product_model' in df.columns:
                df['model_series'] = df['product_model'].str.split('-').str[0]
            return df
        except Exception as e:
            print(f"Error fetching product stocks: {e}")
            return None

    def get_order_amounts(self, token: str) -> Optional[pd.DataFrame]:
        """Get order amount data"""
        try:
            data = self.fetch_data(f"{self.orders_endpoint}/amounts", token)
            df = pd.DataFrame(data)
            if 'created_date' in df.columns:
                df['created_date'] = pd.to_datetime(df['created_date'])
            return df
        except Exception as e:
            print(f"Error fetching order amounts: {e}")
            return None
