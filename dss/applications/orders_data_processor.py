def process_orders(orders_df):
    """Processes and aggregates order data by month."""
    if 'order_date' not in orders_df.columns:
        raise ValueError("Missing 'order_date' column in data")

    orders_df['order_date'] = pd.to_datetime(orders_df['order_date'])
    orders_df['month'] = orders_df['order_date'].dt.to_period('M')

    grouped = orders_df.groupby('month').size().reset_index(name='order_count')
    print("Orders processed successfully.")
    return grouped
