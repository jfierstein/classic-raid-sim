import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Collapse } from 'react-bootstrap';
import GeocodeAddress from 'components/common/GeocodeAddress';

export default class AddressSearchCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: props.defaultCollapsed !== undefined ? props.defaultCollapsed : true,
            address: null
        };
    }

    render() {
        return (
            <Card className="app-card shadow">
                <Card.Header onClick={e => this.setState({ ...this.state, collapsed: !this.state.collapsed })}>
                    <Row>
                        <Col xs="10" className="left-align">
                            <i className="fa fa-map-marker app-icon-left" /> Address Search
            </Col>
                        <Col xs="2" className="right-align">
                            <i className={this.state.collapsed ? "fa fa-chevron-right app-icon" : "fa fa-chevron-down app-icon"} />
                        </Col>
                    </Row>
                </Card.Header>
                <Collapse in={!this.state.collapsed}>
                    <div>
                        <Card.Body>
                            <GeocodeAddress placeholder="Search address..." defaultCollapsed={false} onChange={ e => { if(this.props.onChange) this.props.onChange(this.state.address); } }/>
                        </Card.Body>
                    </div>
                </Collapse>
            </Card>
        );
    }
}