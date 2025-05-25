def process_products(products_df):
    """Aggregates stock quantities by product name and model."""
    grouped = products_df.groupby(['product_name', 'product_model'])['stock_quantity'].sum().reset_index()
    print("Products processed successfully.")
    return grouped 