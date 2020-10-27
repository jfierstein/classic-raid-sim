import React from 'react';
import { Modal } from 'react-bootstrap';

class AppModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  handleClose = () => {
    if(this.props.close)
      this.props.close()
  }

  render() {
    return (
      <div>
        <Modal show={this.props.show} close={this.close} className={this.props.className}>
          <Modal.Header toggle={this.toggle}>
            {this.props.header ? this.props.header : null}
          </Modal.Header>
          <Modal.Body>
            {this.props.body ? this.props.body : null}
          </Modal.Body>
          <Modal.Footer>
            {this.props.footer ? this.props.footer : null}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AppModal;