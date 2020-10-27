import React from 'react';
import { connect } from 'react-redux';
import qs from 'query-string';
import moment from 'moment';
import { ListGroup, Collapse, Card, Row, Col } from 'react-bootstrap';
import LoadingSpinner from 'components/common/LoadingSpinner';

import { getReports, getStats } from 'actions/wclActions';


const mapStoreStateToProps = (store) => {
  return {
    fetching: store.wcl.fetching,
    reports: store.wcl.reports,
    stats: store.wcl.stats
  };
}

class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: {
        reports: true
      }
    }
  }

  componentWillReceiveProps(props) {
    const { reports, fetching, stats } = props
    this.setState({ ...this.state, reports, fetching, stats }, () => {
      if(reports && !this.state.stats) {
        this.props.dispatch(getStats(reports))
      }
    });
  }

  componentDidMount() {
    const { location } = this.props;
    const params = qs.parse(location.search);
    this.setState({ ...this.state, fetching: true });
    console.log(params);
    this.props.dispatch(getReports(params));
  }

  loadReports = () => {
    const reportItems = [];
    const reports = this.state.reports || [];
    for (let report of reports) {
      const duration = moment(report.end).diff(moment(report.start), 'minutes');
      reportItems.push(
        <ListGroup.Item>
          <a target="_blank" rel="noopener noreferrer" href={`https://classic.warcraftlogs.com/reports/${report.id}`}><span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{report.title}</span></a>
          <br />
          Zone: {report.zoneName}
          <br />
          Date:  {moment(report.startDate).format("ddd, MMM D")} ({moment(report.startDate).fromNow()})
          <br />
          Start: {moment(report.startDate).format("h:mm:ss a")}
          <br />
          End: {moment(report.endDate).format("h:mm:ss a")}
          <br />
          Duration: {`${duration} minutes`}
        </ListGroup.Item>)
    }
    return <ListGroup>{reportItems}</ListGroup>;
  }

  toggleReports = () => {
    const collapsed = this.state.collapsed;
    collapsed.reports = !collapsed.reports;
    this.setState({ ...this.state, collapsed })
  }

  loadStats = () => {
    const statsItems = [];
    const stats = this.state.stats || [];
    for (let [idx, stat] of stats.entries()) {
      statsItems.push(
        <ListGroup.Item style={{padding: '3px'}}>
         {idx+1}: {stat.name} ({stat.totalDamage})
        </ListGroup.Item>)
    }
    return <ListGroup>{statsItems}</ListGroup>;
  }

  render() {
    return (
      <div style={{ marginTop: '65px', overflowX: 'hidden' }}>
        <Row className="justify-content-md-center">
          <Col xs="12" lg="6">
              <Card>
                <Card.Header onClick={this.toggleReports}>
                    <span class="link">Reports {this.state.collapsed.reports ? '[+]' : '[-]'}</span>
                </Card.Header>              
                <Collapse in={!this.state.collapsed.reports}>
                    <div>
                      <Card.Body>
                        {!this.state.reports ?
                          <LoadingSpinner /> :
                          this.loadReports()}
                      </Card.Body>
                    </div>
                </Collapse>    
              </Card>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs="12" lg="6">
              <Card>
                <Card.Header onClick={this.toggleReports}>
                    <span className="link">Rankings (Damage Done) {this.state.collapsed.stats ? '[+]' : '[-]'}</span>
                </Card.Header>              
                <Collapse in={!this.state.collapsed.stats}>
                    <div>
                      <Card.Body>
                        {!this.state.stats ?
                          <LoadingSpinner /> :
                          this.loadStats()}
                      </Card.Body>
                    </div>
                </Collapse>    
              </Card>
          </Col>
        </Row>
      </div>
    )

  }
}

export default connect(mapStoreStateToProps)(Reports)