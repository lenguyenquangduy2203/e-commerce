# app.py
import dash
from dash import html, dcc
import plotly.express as px
from data_handler import fetch_order_volume
from data_processor import process_order_volume

# Initialize Dash app
app = dash.Dash(__name__)

# Fetch and process data
raw_data = fetch_order_volume()
df = process_order_volume(raw_data)

# Create figure
fig = px.bar(df, x='month', y='volume', title='Monthly Order Volume')

# Define layout
app.layout = html.Div([
    html.H1("Customer Order Analysis Dashboard"),
    dcc.Graph(figure=fig)
])

if __name__ == '__main__':
    app.run_server(debug=True)
