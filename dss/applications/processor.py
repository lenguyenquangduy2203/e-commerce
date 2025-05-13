import pandas as pd
from typing import Dict, List, Tuple
from datetime import datetime, timedelta
from .handler import ProductWithStockQuantity

class ProductDataProcessor:
    def __init__(self, products: List[ProductWithStockQuantity]):
        self.df = pd.DataFrame(products)

    def get_stock_by_product_name(self) -> Dict[str, int]:
        return self.df.groupby("product_name")["stock_quantity"].sum().to_dict()

class DataProcessor:
    def __init__(self, user_df: pd.DataFrame = None, product_df: pd.DataFrame = None, order_df: pd.DataFrame = None):
        self.user_df = user_df
        self.product_df = product_df
        self.order_df = order_df

    # User Analysis Methods
    def analyze_user_types(self) -> Tuple[List[str], List[int]]:
        """Analyze user type distribution"""
        if self.user_df is None:
            return [], []
        type_counts = self.user_df.groupby('user_type')['amount'].sum()
        return list(type_counts.index), list(type_counts.values)

    # Product Analysis Methods
    def analyze_stock_levels(self) -> Tuple[List[str], List[int]]:
        """Analyze product stock levels"""
        if self.product_df is None:
            return [], []
        bins = [0, 10, 50, 100, float('inf')]
        labels = ['Critical (0-10)', 'Low (11-50)', 'Normal (51-100)', 'High (>100)']
        stock_dist = pd.cut(self.product_df['stock_quantity'], 
                          bins=bins, 
                          labels=labels).value_counts()
        return list(stock_dist.index), list(stock_dist.values)

    def get_critical_stock(self, threshold: int = 10) -> pd.DataFrame:
        """Get products with critical stock levels"""
        if self.product_df is None:
            return pd.DataFrame()
        return self.product_df[
            self.product_df['stock_quantity'] <= threshold
        ].sort_values('stock_quantity')

    # Order Analysis Methods
    def analyze_daily_orders(self, days: int = 30) -> Tuple[List[str], List[float]]:
        """Analyze daily order amounts"""
        if self.order_df is None:
            return [], []
        cutoff_date = datetime.now() - timedelta(days=days)
        recent_orders = self.order_df[self.order_df['created_date'] >= cutoff_date]
        daily_amounts = recent_orders.groupby('created_date')['amount'].sum()
        return [d.strftime('%Y-%m-%d') for d in daily_amounts.index], list(daily_amounts.values)

    def get_order_summary(self) -> Dict:
        """Get order summary statistics"""
        if self.order_df is None:
            return {}
        return {
            'total_orders': len(self.order_df),
            'total_amount': self.order_df['amount'].sum(),
            'avg_amount': self.order_df['amount'].mean(),
            'max_amount': self.order_df['amount'].max(),
            'min_amount': self.order_df['amount'].min()
        }
