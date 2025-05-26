from dash import html, dcc, Output, Input, State, callback
import dash_bootstrap_components as dbc
import pandas as pd
import plotly.express as px
import requests
from datetime import datetime

def products_chart(title, chart_id):
    return dbc.Card([
        dbc.CardHeader(html.H4(title)),
        dbc.CardBody([
            dbc.Row([
                dbc.Col(dcc.DatePickerSingle(
                    id=f"{chart_id}-start-date",
                    placeholder="Start Date",
                    display_format="YYYY-MM-DD"
                )),
                dbc.Col(dcc.DatePickerSingle(
                    id=f"{chart_id}-end-date",
                    placeholder="End Date",
                    display_format="YYYY-MM-DD"
                )),
                dbc.Col(dbc.Button("Load Data", id=f"{chart_id}-submit", color="primary"))
            ], className="mb-3"),
            dcc.Loading(dcc.Graph(id=f"{chart_id}-figure"))
        ])
    ], className="mb-4")

@callback(
    Output("products-chart-figure", "figure"),
    Input("products-chart-submit", "n_clicks"),
    State("products-chart-start-date", "date"),
    State("products-chart-end-date", "date"),
    State("auth-token", "data"),
)
def update_products_chart(n_clicks, start_date, end_date, token_data):
    if not token_data or "access_token" not in token_data:
        return px.bar(title="No JWT Token Found")

    if not start_date or not end_date:
        return px.bar(title="Please select both start and end dates")

    try:
        sd = datetime.strptime(start_date, "%Y-%m-%d")
        ed = datetime.strptime(end_date, "%Y-%m-%d")
        if sd > ed:
            return px.bar(title="Start date must be before or equal to end date")
    except Exception as e:
        return px.bar(title=f"Invalid date format: {e}")

    headers = {
        "Authorization": f"Bearer {token_data['access_token']}"
    }
    params = {
        "startDate": start_date,
        "endDate": end_date
    }

    try:
        response = requests.get("http://localhost:8080/api/product-stock", headers=headers, params=params)
        response.raise_for_status()
        data = response.json()

        if not data:
            return px.bar(title="No data returned for selected date range")

        # Create DataFrame directly from the list of dictionaries
        df = pd.DataFrame(data)
        
        # Verify required columns exist
        required_columns = ['productName', 'productModel', 'quantity']
        if not all(col in df.columns for col in required_columns):
            return px.bar(title="Invalid data format received from server")
        
        # Create the combined product name and model for display
        df['Product'] = df['productName'] + ' (' + df['productModel'] + ')'
        
        # Sort by quantity for better visualization
        df = df.sort_values('quantity', ascending=False)
        
        fig = px.bar(
            df, 
            x='Product', 
            y='quantity',
            title='Product Stock Levels',
            labels={'Product': 'Product (Model)', 'quantity': 'Stock Quantity'},
            color='quantity',  # Add color gradient based on quantity
            color_continuous_scale='Viridis'  # Use a nice color scale
        )
        
        # Improve layout
        fig.update_layout(
            xaxis_tickangle=-45,  # Angle the labels for better readability
            showlegend=False,     # Hide legend since we're using color scale
            margin=dict(b=100)    # Add bottom margin for angled labels
        )
        
        return fig

    except requests.exceptions.HTTPError as http_err:
        return px.bar(title=f"HTTP error: {http_err}")
    except Exception as e:
        return px.bar(title=f"Error: {e}") 