import dash_bootstrap_components as dbc
from dash import html

def graph_placeholder(title):
    return dbc.Row([
        dbc.Col([
            dbc.Card([
                dbc.CardHeader(title),
                dbc.CardBody([
                    html.Div(
                        "Graph will be here.",
                        style={
                            "height": "300px",
                            "display": "flex",
                            "justifyContent": "center",
                            "alignItems": "center",
                            "background": "#f8f9fa",
                            "border": "2px dashed #ced4da",
                            "borderRadius": "10px"
                        }
                    )
                ])
            ], className="mb-4")
        ])
    ])
