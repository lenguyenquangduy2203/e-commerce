# app.py
from flask import Flask, jsonify, render_template
from orders_data_handler import load_orders_data
from orders_data_processor import process_monthly_revenue

app = Flask(__name__)

@app.route("/api/monthly-revenue")
def get_monthly_revenue():
    df = load_orders_data()
    summary = process_monthly_revenue(df)
    data = {
        "labels": summary["order_date"].tolist(),
        "values": summary["order_amount"].tolist()
    }
    return jsonify(data)

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)