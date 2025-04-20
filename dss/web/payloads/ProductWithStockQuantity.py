from typing import TypedDict


class ProductWithStockQuantity(TypedDict):
    product_name: str
    product_model: str
    stock_quantity: int
