def generate_bar_chart_data(processed_data):
    # Combine product_name and product_model for labels
    labels = [f"{row['product_name']} ({row['product_model']})" for _, row in processed_data.iterrows()]
    values = processed_data['stock_quantity'].tolist()
    return {
        "labels": labels,
        "values": values
    }   