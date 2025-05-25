import datetime
import requests
from dash import Dash, html, dcc, Input, Output, State

from applications.processor import calculate_user_type_percentages
from applications.pieChart import build_user_type_pie_chart

# UI component: chỉ layout thôi
user_analysis_component = html.Div([
    html.H3("User Type Analysis"),
    
    html.Div([
        dcc.DatePickerRange(
            id="user-date-picker",
            min_date_allowed=datetime.date(2020, 1, 1), # type: ignore
            max_date_allowed=datetime.date.today(), # type: ignore
            start_date=datetime.date.today() - datetime.timedelta(days=7), # type: ignore
            end_date=datetime.date.today(), # type: ignore
        ),
        html.Button("Submit", id="submit-user-btn", n_clicks=0),
    ], style={"marginBottom": "1rem"}),

    dcc.Graph(id="user-type-pie-chart")
])

def init_user_analysis_handler(app: Dash):
    # Callback xử lý dữ liệu & API
    @app.callback(
        Output("user-type-pie-chart", "figure"),
        Input("submit-user-btn", "n_clicks"),
        State("user-date-picker", "start_date"),
        State("user-date-picker", "end_date"),
        State("auth-token", "data")  # ⚠️ token từ dcc.Store có sẵn trong app.py
    )
    def update_user_type_chart(n_clicks, start_date, end_date, jwt_token):
        if not jwt_token or not start_date or not end_date:
            return build_user_type_pie_chart({})  # Biểu đồ trống

        if start_date > end_date:
            return build_user_type_pie_chart({})  # Ngày không hợp lệ

        headers = {
            "Authorization": f"Bearer {jwt_token}"
        }

        params = {
            "startDate": start_date,
            "endDate": end_date,
            "numerator": 2,
            "denominator": 3
        }

        try:
            print("Headers:", headers, flush=True)
            response = requests.get("http://backend:8080/api/analytics/users", headers=headers, params=params)
            response.raise_for_status()
            data = response.json()
            print("Data:", data, flush=True)
        except Exception as e:
            print("API error:", e, flush=True)
            return build_user_type_pie_chart({})

        percentages = calculate_user_type_percentages(data)
        return build_user_type_pie_chart(percentages)
