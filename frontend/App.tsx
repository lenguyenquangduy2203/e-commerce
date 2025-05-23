import React from 'react';
import { Container } from 'react-bootstrap';
import ProductChart from './components/ProductChart';

function App() {
    return (
        <Container fluid>
            <h1 className="my-4">Product Analytics Chart</h1>
            <ProductChart />
        </Container>
    );
}

export default App; 