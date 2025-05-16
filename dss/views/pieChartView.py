import dash
from dash import html, dcc, Input, Output, State
import datetime
import requests

from application.customer_processor import calculate_user_type_percentages
from application.customer_chart import build_user_type_pie_chart

dash.register_page(__name__, path="/users", name="User Analysis")

layout = html.Div([
    html.H3("User Type Analysis"),
    
    html.Div([
        dcc.DatePickerRange(
            id="user-date-picker",
            min_date_allowed=datetime.date(2020, 1, 1),
            max_date_allowed=datetime.date.today(),
            start_date=datetime.date.today() - datetime.timedelta(days=7),
            end_date=datetime.date.today(),
        ),
        html.Button("Submit", id="submit-user-btn", n_clicks=0),
    ], style={"marginBottom": "1rem"}),

    dcc.Graph(id="user-type-pie-chart")
])

@dash.callback(
    Output("user-type-pie-chart", "figure"),
    Input("submit-user-btn", "n_clicks"),
    State("user-date-picker", "start_date"),
    State("user-date-picker", "end_date"),
    State("jwt-token", "data")  # ✅ lấy từ store chung của app.py
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
        response = requests.get("http://localhost:8080/api/analytics/users", headers=headers, params=params)
        response.raise_for_status()
        data = response.json()
    except Exception as e:
        print("API error:", e)
        return build_user_type_pie_chart({})

    percentages = calculate_user_type_percentages(data)
    return build_user_type_pie_chart(percentages)
