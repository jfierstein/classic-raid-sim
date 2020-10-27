import React from 'react';
import { connect } from 'react-redux';
import history from 'routes/history';
import { eventStream } from 'actions/eventActions';
import { Navbar } from 'react-bootstrap';
import './Header.css';


function mapStoreStateToProps(store) {
  return {

  }
}

class Header extends React.Component {

  componentWillMount() {
    this.props.dispatch(eventStream());
  }

  logout = () => {
    window.location.href = '/api/auth/logout';
  }

  render() {
    return (
      <Navbar fixed="top" style={{ padding: '0.2rem 0.5rem' }} className="shadow" bg="primary" variant="dark" expand="sm">
        <Navbar.Brand className="pointer" onClick={e => history.push('/')}>
          <i className="ml-1 mdi mdi-graph" style={{ marginRight: '5px' }} />Classid Raid Sim
        </Navbar.Brand>        
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>            
          </Navbar.Text> 
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default connect(mapStoreStateToProps)(Header);