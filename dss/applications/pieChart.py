import plotly.express as px
from typing import Dict
from plotly.graph_objs import Figure

def build_user_type_pie_chart(percentages: Dict[str, float]) -> Figure:
    """
    Vẽ Pie chart từ dict phần trăm loại khách hàng.

    Args:
        percentages (Dict[str, float]): {'New': %, 'Returning': %}

    Returns:
        Plotly Figure
    """
    fig = px.pie(
        names=list(percentages.keys()),
        values=list(percentages.values()),
        title="Customer Distribution: New vs Returning",
        color_discrete_sequence=["#66c2a5", "#fc8d62"]
    )
    fig.update_traces(textinfo="percent+label")
    return fig
