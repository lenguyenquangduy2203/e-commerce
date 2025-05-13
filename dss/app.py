from dash import Dash, dcc
import dash_bootstrap_components as dbc
from dash import html
from views.product_bar_chart_web_page import init_product_analysis
from views.customer_bar_chart_web_page import init_customer_analysis
from web.token import init_token_handler

# Create the Dash app with Bootstrap
app = Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])

# Initialize analyses
product_analysis_layout = init_product_analysis(app)
customer_analysis_layout = init_customer_analysis(app)

# Layout
app.layout = dbc.Container([
    dcc.Store(id="auth-token"),
    dcc.Interval(id='load-token-once', interval=500, n_intervals=0, max_intervals=1),
    dbc.Row([
        dbc.Col(html.H1("E-Commerce Analytics Dashboard"), className="mb-4 mt-4")
    ]),
    dbc.Tabs([
        dbc.Tab(product_analysis_layout, label="Product Analysis"),
        dbc.Tab(customer_analysis_layout, label="Customer Analysis")
    ])
], fluid=True)

init_token_handler(app)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
