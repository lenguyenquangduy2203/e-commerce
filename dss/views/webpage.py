from dash import html, dcc
import dash_bootstrap_components as dbc
from dash.dependencies import Input, Output
import plotly.graph_objs as go
from applications.handler import DataHandler
from applications.processor import DataProcessor
import os

def create_chart(data, chart_type='bar', title='', x_label='', y_label=''):
    """Create a chart (bar or line) with given data"""
    x_data, y_data = data
    
    trace = {
        'x': x_data,
        'y': y_data,
        'type': chart_type,
        'marker': {'color': '#636EFA'}
    }
    if chart_type == 'scatter':
        trace['mode'] = 'lines+markers'
    
    layout = {
        'title': title,
        'xaxis': {'title': x_label},
        'yaxis': {'title': y_label},
        'margin': {'l': 40, 'r': 20, 't': 40, 'b': 30}
    }
    
    return {'data': [trace], 'layout': layout}

def create_summary_card(title, value):
    """Create a card showing summary statistics"""
    return dbc.Card(
        dbc.CardBody([
            html.H4(title, className="card-title"),
            html.H2(f"{value:,.2f}", className="card-text")
        ]),
        className="mb-4"
    )

def init_dashboard(app):
    """Initialize the dashboard with all components"""
    
    layout = dbc.Container([
        dbc.Row([
            dbc.Col(html.H1("E-Commerce Analytics Dashboard"), className="mb-4 mt-4")
        ]),
        
        # Summary Cards
        dbc.Row(id='summary-cards'),
        
        # Stock Analysis
        dbc.Row([
            dbc.Col([
                html.H3("Stock Analysis", className="mb-4"),
                dcc.Graph(id='stock-levels-chart')
            ], width=6),
            dbc.Col([
                html.H3("Critical Stock", className="mb-4"),
                html.Div(id='critical-stock-table')
            ], width=6)
        ]),
        
        # Order Analysis
        dbc.Row([
            dbc.Col([
                html.H3("Order Trends", className="mb-4"),
                dcc.Graph(id='order-trends-chart')
            ], width=12)
        ]),
        
        # User Analysis
        dbc.Row([
            dbc.Col([
                html.H3("User Type Distribution", className="mb-4"),
                dcc.Graph(id='user-types-chart')
            ], width=12)
        ])
    ], fluid=True)
    
    @app.callback(
        [Output('summary-cards', 'children'),
         Output('stock-levels-chart', 'figure'),
         Output('critical-stock-table', 'children'),
         Output('order-trends-chart', 'figure'),
         Output('user-types-chart', 'figure')],
        [Input('auth-token', 'data')]
    )
    def update_dashboard(token):
        if not token:
            return [], {}, None, {}, {}
        
        # Initialize handler and get data
        handler = DataHandler(os.getenv('BASE_BACKEND_URL', 'http://localhost:8080'))
        user_df = handler.get_user_amounts(token)
        product_df = handler.get_product_stocks(token)
        order_df = handler.get_order_amounts(token)
        
        # Process data
        processor = DataProcessor(user_df, product_df, order_df)
        
        # Create summary cards
        order_summary = processor.get_order_summary()
        summary_cards = [
            dbc.Col(create_summary_card("Total Orders", order_summary.get('total_orders', 0)), width=3),
            dbc.Col(create_summary_card("Total Revenue", order_summary.get('total_amount', 0)), width=3),
            dbc.Col(create_summary_card("Average Order", order_summary.get('avg_amount', 0)), width=3),
            dbc.Col(create_summary_card("Max Order", order_summary.get('max_amount', 0)), width=3)
        ]
        
        # Create charts
        stock_chart = create_chart(
            processor.analyze_stock_levels(),
            'bar',
            'Stock Level Distribution',
            'Stock Level',
            'Number of Products'
        )
        
        # Create critical stock table
        critical_stock = processor.get_critical_stock()
        critical_table = dbc.Table.from_dataframe(
            critical_stock,
            striped=True,
            bordered=True,
            hover=True,
            responsive=True
        ) if not critical_stock.empty else "No critical stock items"
        
        # Create order trend chart
        order_chart = create_chart(
            processor.analyze_daily_orders(),
            'scatter',
            'Daily Order Amounts',
            'Date',
            'Total Amount'
        )
        
        # Create user type chart
        user_chart = create_chart(
            processor.analyze_user_types(),
            'bar',
            'User Type Distribution',
            'User Type',
            'Total Amount'
        )
        
        return summary_cards, stock_chart, critical_table, order_chart, user_chart
    
    return layout

if __name__ == "__main__":
    app.run(debug=True)
    