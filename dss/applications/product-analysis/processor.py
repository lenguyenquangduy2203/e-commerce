def process_product_data(raw_data):
    # Example: aggregate sales by product name
    product_sales = {}
    for item in raw_data:
        name = item.get('name')
        sales = item.get('sales', 0)
        if name in product_sales:
            product_sales[name] += sales
        else:
            product_sales[name] = sales
    # Convert to list of dicts for charting
    return [{"name": name, "sales": sales} for name, sales in product_sales.items()] 