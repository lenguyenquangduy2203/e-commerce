import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface ProductStockData {
    labels: string[];
    values: number[];
}

const ProductStockChart: React.FC = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [chartData, setChartData] = useState<ProductStockData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        if (!startDate || !endDate) {
            setError("Please select both start and end dates");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('auth-token');
            if (!token) {
                throw new Error("No authentication token found");
            }

            const response = await fetch(
                `/api/product-stock?startDate=${startDate.toISOString().split('T')[0]}&endDate=${endDate.toISOString().split('T')[0]}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setChartData(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Product Stock Levels',
            },
        },
    };

    const data = chartData ? {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Stock Quantity',
                data: chartData.values,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    } : null;

    return (
        <Card className="mb-4">
            <Card.Header>
                <h4>Product Stock Chart</h4>
            </Card.Header>
            <Card.Body>
                <Row className="mb-3">
                    <Col>
                        <DatePicker
                            selected={startDate}
                            onChange={(date: Date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            placeholderText="Start Date"
                            className="form-control"
                        />
                    </Col>
                    <Col>
                        <DatePicker
                            selected={endDate}
                            onChange={(date: Date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            placeholderText="End Date"
                            className="form-control"
                        />
                    </Col>
                    <Col>
                        <Button
                            variant="primary"
                            onClick={fetchData}
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Load Data'}
                        </Button>
                    </Col>
                </Row>

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                {data && (
                    <div style={{ height: '400px' }}>
                        <Bar options={chartOptions} data={data} />
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default ProductStockChart; 