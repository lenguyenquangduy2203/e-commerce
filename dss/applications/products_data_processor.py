import pandas as pd

def process_products(products_df):
    """Aggregates stock quantities by product name and model."""
    try:
        # Group by product name and model, sum the quantities
        grouped = products_df.groupby(['productName', 'productModel'])['quantity'].sum().reset_index()
        
        # Sort by quantity in descending order
        grouped = grouped.sort_values('quantity', ascending=False)
        
        print("Products processed successfully.")
        return grouped
    except Exception as e:
        print(f"Error processing products: {e}")
        return pd.DataFrame(columns=['productName', 'productModel', 'quantity']) 