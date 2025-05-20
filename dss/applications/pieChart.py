import plotly.express as px
from typing import Dict
from plotly.graph_objs import Figure

def build_user_type_pie_chart(percentages: Dict[str, float]) -> Figure:
    """
    Vẽ biểu đồ Pie thể hiện tỷ lệ phần trăm các loại khách hàng.

    Args:
        percentages (Dict[str, float]): {'New': %, 'Returning': %, ...}

    Returns:
        Plotly Figure
    """
    # Danh sách màu mở rộng để tránh trùng
    color_palette = [
        "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728",
        "#9467bd", "#8c564b", "#e377c2", "#7f7f7f",
        "#bcbd22", "#17becf"
    ]

    fig = px.pie(
        names=list(percentages.keys()),
        values=list(percentages.values()),
        title="User Distribution by Type",
        color_discrete_sequence=color_palette
    )
    fig.update_traces(textinfo="percent+label")
    return fig
