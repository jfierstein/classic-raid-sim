import React from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';

class LoadingSpinner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div style={{margin: '15px 10px'}}>
                <Row>
                <Col xs="12" style={{textAlign: 'center'}}>
                    <Spinner id="loader" animation="border" variant="primary" size="lg" />
                </Col>
                </Row>
            </div>
        );
    }
}

export default LoadingSpinner;