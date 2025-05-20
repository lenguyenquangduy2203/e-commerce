import requests

def fetch_product_data():
    url = 'http://localhost:8080/api/products'  # Adjust to your actual endpoint
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()  # Expecting a list of product sales
    except requests.RequestException as e:
        print(f"API request failed: {e}")
        return [] 