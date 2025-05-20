# views/orders_chart.py

from dash import html, dcc, Output, Input, State, callback, ctx
import dash_bootstrap_components as dbc
import pandas as pd
import plotly.express as px
import requests
from datetime import datetime

def orders_chart(title, chart_id):
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

# Callback to fetch order volume and update chart
@callback(
    Output("orders-chart-figure", "figure"),
    Input("orders-chart-submit", "n_clicks"),
    State("orders-chart-start-date", "start_date"),
    State("orders-chart-end-date", "end_date"),
    State("auth-token", "data"),
)
def update_orders_chart(n_clicks, start_date, end_date, token_data):
    if not token_data or "access_token" not in token_data:
        return px.bar(title="No JWT Token Found")

    if not start_date or not end_date:
        return px.bar(title="Please select both start and end dates")

    # Validate date order
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
        response = requests.get("http://localhost:8080/api/analytics/orders", headers=headers, params=params)
        response.raise_for_status()
        data = response.json()

        if not data:
            return px.bar(title="No data returned for selected date range")

        df = pd.DataFrame(data)
        df['date'] = pd.to_datetime(df['date'])
        df = df.sort_values('date')
        fig = px.bar(df, x='date', y='volume', title='Order Volume by Date')
        return fig

    except requests.exceptions.HTTPError as http_err:
        return px.bar(title=f"HTTP error: {http_err}")
    except Exception as e:
        return px.bar(title=f"Error: {e}")
