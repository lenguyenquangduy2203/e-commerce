# app.py
from flask import Flask, jsonify, render_template, request
from products_data_handler import load_products_data
from products_data_processor import process_products
from web.token import get_token
import pandas as pd

app = Flask(__name__)

@app.route("/api/product-stock")
def get_product_stock():
    # Get auth token from request headers
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({"error": "Missing or invalid authorization header"}), 401

    token = auth_header.split(' ')[1]
    
    # Get query parameters
    start_date = request.args.get('startDate')
    end_date = request.args.get('endDate')
    
    if not start_date or not end_date:
        return jsonify({"error": "Missing date parameters"}), 400

    try:
        df = load_products_data()
        # Convert dates to datetime for filtering
        df['product_date'] = pd.to_datetime(df['product_date'])
        start_dt = pd.to_datetime(start_date)
        end_dt = pd.to_datetime(end_date)
        
        # Filter data based on date range
        df = df[(df['product_date'] >= start_dt) & (df['product_date'] <= end_dt)]
        
        summary = process_products(df)
        data = {
            "labels": [f"{row['product_name']} ({row['product_model']})" for _, row in summary.iterrows()],
            "values": summary["stock_quantity"].tolist()
        }
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)