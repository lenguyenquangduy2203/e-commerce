import plotly.express as px
from plotly.graph_objs import Figure

def build_customer_pie_chart(data: dict) -> Figure:
    """Tạo Pie chart từ dict {'New': x, 'Returning': y}"""
    fig = px.pie(
        names=list(data.keys()),
        values=list(data.values()),
        title="Customer Orders: New vs Returning",
        color_discrete_sequence=["#00BFC4", "#F8766D"]
    )
    fig.update_traces(textinfo="percent+label")
    return fig
