import dash
import dash_bootstrap_components as dbc
from dash import html
from views.sample import graph_placeholder

# Create the Dash app with Bootstrap
app = dash.Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])

# Layout
app.layout = dbc.Container([
    dbc.Row([
        dbc.Col(html.H1("Simple DSS Dashboard"), className="mb-4 mt-4")
    ]),

    graph_placeholder("Sine Wave Placeholder"),
    graph_placeholder("Cosine Wave Placeholder"),
    graph_placeholder("Combined Wave Placeholder")
], fluid=True)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
