import matplotlib.pyplot as plt

def plot_order_bar_chart(aggregated_data):
    """Plots a bar chart of order count per month."""
    plt.figure(figsize=(10, 5))
    plt.bar(aggregated_data['month'].astype(str), aggregated_data['order_count'], color='skyblue')
    plt.xlabel("Month")
    plt.ylabel("Number of Orders")
    plt.title("Orders Per Month")
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.show()
