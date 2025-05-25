from dash import Dash, Input, Output


def init_token_handler(app: Dash):
    app.clientside_callback(
        """
        function(n_intervals) {
            return sessionStorage.getItem('token') || null;
        }
        """,
        Output('auth-token', 'data'),
        Input('token-sync', 'n_intervals')
    )

    @app.callback(
        Output('auth-token', 'data', allow_duplicate=True),
        Input('auth-token', 'data'),
        prevent_initial_call='initial_duplicate'
    )
    def show_token(token):
        print(f"Token received from client: {token}" if token else "No token found.", flush=True)

        return token
