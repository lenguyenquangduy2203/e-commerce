from dash import Dash, dcc, Output, Input
import dash_bootstrap_components as dbc
from dash import html
from views.sample import graph_placeholder

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

app.clientside_callback(
    """
    function(n_intervals) {
        if (n_intervals > 0) {
            return sessionStorage.getItem('token');
        }

        return window.dash_clientside.no_update;
    }
    """,
    Output('auth-token', 'data'),
    Input('load-token-once', 'n_intervals')
)

@app.callback(
    Output('auth-token', 'data', allow_duplicate=True),
    Input('auth-token', 'data'),
    prevent_initial_call='initial_duplicate'
)
def show_token(token):
    print(f"Token received from client: {token}" if token else "No token found.")

    return token

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
