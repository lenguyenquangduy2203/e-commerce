# views/orders_chart.py

from dash import html, dcc, Output, Input, State, callback
import dash_bootstrap_components as dbc
import pandas as pd
import plotly.express as px
import requests

def orders_chart(title, chart_id):
    return dbc.Card([
        dbc.CardHeader(html.H4(title)),
        dbc.CardBody([
            dcc.Loading(dcc.Graph(id=f"{chart_id}-figure")),
            dcc.Interval(id=f"{chart_id}-load", interval=500, n_intervals=0, max_intervals=1)
        ])
    ], className="mb-4")

# Callback to load data with JWT and render chart
@callback(
    Output(component_id=f"orders-chart-figure", component_property="figure"),
    Input(component_id=f"orders-chart-load", component_property="n_intervals"),
    State(component_id="auth-token", component_property="data"),
)
def update_orders_chart(n_intervals, token_data):
    if not token_data or 'access_token' not in token_data:
        return px.bar(title="No Auth Token")

    headers = {"Authorization": f"Bearer {token_data['access_token']}"}
    try:
        resp = requests.get("http://localhost:8080/api/analytics/orders/volume", headers=headers)
        resp.raise_for_status()
        data = resp.json()
        df = pd.DataFrame(data)
        df['month'] = pd.to_datetime(df['month'])
        df = df.sort_values(by='month')
        fig = px.bar(df, x='month', y='volume', title='Monthly Order Volume')
        return fig
    except Exception as e:
        return px.bar(title=f"Error: {e}")
