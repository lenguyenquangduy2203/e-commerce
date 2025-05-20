from dash import Dash, dcc
import dash_bootstrap_components as dbc
from dash import html
from views.sample import graph_placeholder
from views.pieChartView import init_user_analysis_handler, user_analysis_component
from views.orders_chart import init_orders_chart_handler, orders_chart
from web.token import init_token_handler

# Create the Dash app with Bootstrap
app = Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])

# Layout
app.layout = dbc.Container([
    dcc.Store(id="auth-token"),
    dcc.Interval(id='token-sync', interval=1000, n_intervals=0),
    dbc.Row([
        dbc.Col(html.H1("Simple DSS Dashboard"), className="mb-4 mt-4")
    ]),
    user_analysis_component,
    orders_chart("Order Volume", 2),
    graph_placeholder("Combined Wave Placeholder")
], fluid=True)

init_token_handler(app)
init_user_analysis_handler(app)
init_orders_chart_handler(app)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
