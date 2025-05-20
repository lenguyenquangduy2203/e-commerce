# app.py
from flask import Flask, jsonify, render_template
from products_data_handler import load_products_data
from products_data_processor import process_products

app = Flask(__name__)

@app.route("/api/product-stock")
def get_product_stock():
    df = load_products_data()
    summary = process_products(df)
    data = {
        "labels": [f"{row['product_name']} ({row['product_model']})" for _, row in summary.iterrows()],
        "values": summary["stock_quantity"].tolist()
    }
    return jsonify(data)

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)