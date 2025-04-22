from dash import Dash, Input, Output


def init_token_handler(app: Dash):
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
