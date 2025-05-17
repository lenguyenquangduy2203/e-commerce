# data_handler.py
import requests

def fetch_order_volume():
    url = 'http://localhost:8080/api/analytics/orders/volume'  # Adapt to actual endpoint
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"API request failed: {e}")
        return []
