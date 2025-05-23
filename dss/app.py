from dash import Dash, dcc
import dash_bootstrap_components as dbc
from dash import html
from views.products_chart import products_chart
from web.token import init_token_handler

# Create the Dash app with Bootstrap
app = Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])

# Layout
app.layout = dbc.Container([
    dcc.Store(id="auth-token"),
    dcc.Interval(id='load-token-once', interval=500, n_intervals=0, max_intervals=1),
    dbc.Row([
        dbc.Col(html.H1("Product Analytics Dashboard"), className="mb-4 mt-4")
    ]),
    products_chart("Product Stock Levels", "products-chart")
], fluid=True)

init_token_handler(app)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
