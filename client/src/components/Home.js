import React from 'react';
import { connect } from 'react-redux';
import { Form, Card, Row, Col, Button } from 'react-bootstrap';
import LoadingSpinner from 'components/common/LoadingSpinner';
import history from 'routes/history';
import { getZones } from 'actions/wclActions';


const mapStoreStateToProps = (store) => {
  return {
    fetching: store.wcl.fetching,
    zones: store.wcl.zones
  };
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: 'US',
      zone: 1005
    }
  }
  
  componentWillReceiveProps(props) {
    const { zones, fetching } = props;
    this.setState({ ...this.state, zones, fetching });
  }

  componentDidMount() {
      this.setState({ ...this.state, fetching: true });
      this.props.dispatch(getZones());
  }

  getZoneOptions = () => {
    const zones = this.state.zones || [];
    const zoneOptions = [];
    for (let zone of zones) {
      zoneOptions.push(
        <option selected={this.state.zone == zone.id} value={zone.id}>{zone.name}</option>
      )
    }
    return zoneOptions;
  }

  render() {
    return (
      <div style={{marginTop:'65px', overflowX: 'hidden'}}>
        <Row className="justify-content-md-center">
          <Col xs="12" lg="6">
            <Card style={{margin:'10px', padding: '10px'}}>
              <Form.Group>
                <Form.Label>Guild</Form.Label>
                <Form.Control type="text" placeholder="Exclusive" onChange={(e)=>this.setState({ ...this.state, guild: e.target.value })}/>
                <br />
                <Form.Label>Server</Form.Label>
                <Form.Control type="text" placeholder="Netherwind" onChange={(e)=>this.setState({ ...this.state, realm: e.target.value })}/>
                <br />
                <Form.Label>Region</Form.Label>
                <Form.Control as="select" custom onChange={(e)=>this.setState({ ...this.state, region: e.target.value })}>
                  <option value="US" selected={this.state.region=='US'}>US</option>
                  <option value="EU" selected={this.state.region=='EU'}>EU</option>
                  <option value="KR">KR</option>
                  <option value="TW">TW</option>
                  <option value="CN">CN</option>
                </Form.Control>
                <br />
                {!this.state.fetching ?
                  <div>
                    <Form.Label>Zone</Form.Label>
                    <Form.Control as="select" custom onChange={(e)=>this.setState({ ...this.state, zone: e.target.value })} selected={this.state.zone}>
                      {this.getZoneOptions()}
                    </Form.Control>
                  </div>
                : <LoadingSpinner />}
              </Form.Group>
              <Button onClick={ e => history.push(`/reports?guild=${this.state.guild}&realm=${this.state.realm}&region=${this.state.region}&zone=${this.state.zone}`)}>Submit</Button>
            </Card>
          </Col>
        </Row>
      </div>
    )

  }
}

export default connect(mapStoreStateToProps)(Home)