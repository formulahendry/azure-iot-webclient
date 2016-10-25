import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, FormGroup, FormControl, Col, Button, ControlLabel } from 'react-bootstrap';

class D2CMessageForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({refreshResult = false}) {
    this.props.onUserInput(
      ReactDOM.findDOMNode(this.refs.d2cMessageInput).value,
      ReactDOM.findDOMNode(this.refs.deviceConnectionStringInput).value,
      refreshResult
    );
  }

  render() {
    return (
      <div className="D2CMessageForm">
        <Form horizontal>
          <FormGroup>
            <Col sm={8} smOffset={2} xs={10} xsOffset={1}>
              <ControlLabel>Device Connection String</ControlLabel>
              <FormControl type="text" placeholder="Device Connection String" value={this.props.deviceConnectionString} onChange={() => { this.handleChange({ refreshResult: false }) } } ref="deviceConnectionStringInput"/>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={4} smOffset={4} xs={7} xsOffset={1}>
              <FormControl type="text" placeholder="d2cMessage" value={this.props.d2cMessage} onChange={() => { this.handleChange({ refreshResult: false }) } } ref="d2cMessageInput"/>
            </Col>
            <Col sm={1} xs={1} id="send">
              <Button onClick={() => { this.handleChange({ refreshResult: true }) } }>Send</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default D2CMessageForm;
