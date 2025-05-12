import dash
from dash import html, dcc, Input, Output, State, ctx
import datetime
import requests
import json

from application.customer_processor import calculate_user_type_percentages
from application.customer_chart import build_user_type_pie_chart

dash.register_page(__name__, path="/users", name="User Analysis")

layout = html.Div([
    html.H3("User Type Analysis (New vs Returning, etc.)"),
    
    html.Div([
        dcc.DatePickerRange(
            id="user-date-picker",
            min_date_allowed=datetime.date(2020, 1, 1),
            max_date_allowed=datetime.date.today(),
            initial_visible_month=datetime.date.today(),
            start_date=datetime.date.today() - datetime.timedelta(days=7),
            end_date=datetime.date.today(),
        ),
        html.Button("Submit", id="submit-user-btn", n_clicks=0),
    ], style={"marginBottom": "1rem"}),

    dcc.Graph(id="user-type-pie-chart"),
    dcc.Store(id="jwt-token-storage", storage_type="session")  # token được inject từ app.py
])

@dash.callback(
    Output("user-type-pie-chart", "figure"),
    Input("submit-user-btn", "n_clicks"),
    State("user-date-picker", "start_date"),
    State("user-date-picker", "end_date"),
    State("jwt-token-storage", "data")
)
def update_user_type_chart(n_clicks, start_date, end_date, jwt_token):
    if not jwt_token or not start_date or not end_date:
        return build_user_type_pie_chart({})  # Rỗng

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
        # 👉 Khi có backend thực, bỏ comment phần request này
        # response = requests.get("http://localhost:8080/api/analytics/users", headers=headers, params=params)
        # data = response.json()

        # 🔧 Tạm thời dùng mock data (backend chưa kết nối)
        data = [
            {"user_type": "New", "amount": 25},
            {"user_type": "Returning", "amount": 65},
            {"user_type": "VIP", "amount": 10}
        ]
    except Exception as e:
        print("Error fetching user data:", e)
        return build_user_type_pie_chart({})

    percentages = calculate_user_type_percentages(data)
    return build_user_type_pie_chart(percentages)
