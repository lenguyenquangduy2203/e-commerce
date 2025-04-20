import dash
import dash_bootstrap_components as dbc
from dash import html, dcc
import numpy as np
import plotly.express as px

# Generate some example data
x = np.linspace(0, 10, 100)
y = np.sin(x)

# Create a Dash app with Bootstrap theme
app = dash.Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])

# Layout
app.layout = dbc.Container([
    dbc.Row([
        dbc.Col(html.H1("Simple DSS Dashboard"), className="mb-4 mt-4")
    ]),
    dbc.Row([
        dbc.Col(dcc.Graph(
            figure=px.line(x=x, y=y, labels={'x': 'X Value', 'y': 'Sin(X)'})
        ))
    ])
], fluid=True)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
