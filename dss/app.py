from dash import Dash, dcc
import dash_bootstrap_components as dbc
from dash import html
from views.sample import graph_placeholder
from web.token import init_token_handler

# Create the Dash app with Bootstrap
app = Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])

# Layout
app.layout = dbc.Container([
    dcc.Store(id="auth-token"),
    dcc.Interval(id='load-token-once', interval=500, n_intervals=0, max_intervals=1),
    dbc.Row([
        dbc.Col(html.H1("Simple DSS Dashboard"), className="mb-4 mt-4")
    ]),
    graph_placeholder("Sine Wave Placeholder"),
    graph_placeholder("Cosine Wave Placeholder"),
    graph_placeholder("Combined Wave Placeholder")
], fluid=True)

init_token_handler(app)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
