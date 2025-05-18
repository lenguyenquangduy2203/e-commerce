# dss/customer-analysis/app.py

import dash
from dash import html, dcc
import plotly.express as px
from data_handler import fetch_order_volume
from data_processor import process_order_volume

# Initialize Dash app
app = dash.Dash(__name__)
app.title = "Customer Order Analysis"

# Fetch and process data
raw_data = fetch_order_volume()
df = process_order_volume(raw_data)

# Build the bar chart
def create_bar_chart(dataframe):
    if dataframe.empty:
        return html.Div("No data available from API.", style={"color": "red"})
    fig = px.bar(dataframe, x='month', y='volume', title='Monthly Order Volume')
    fig.update_layout(xaxis_title="Month", yaxis_title="Order Volume")
    return dcc.Graph(figure=fig)

# Layout component
def build_layout():
    return html.Div([
        html.H1("Customer Order Analysis Dashboard", style={"textAlign": "center", "marginBottom": "30px"}),
        create_bar_chart(df),
    ], style={"padding": "40px"})

# Assign layout to app
app.layout = build_layout()

# Run the server
if __name__ == '__main__':
    app.run_server(debug=True)
