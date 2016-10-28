import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, FormGroup, FormControl, Button, Col, ControlLabel } from 'react-bootstrap';
import './ParkingForm.css';

class ParkingForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({refreshResult = false}) {
    this.props.onUserInput(
      ReactDOM.findDOMNode(this.refs.connectionStringInput).value,
      ReactDOM.findDOMNode(this.refs.consumerGroupInput).value,
      refreshResult
    );
  }

  render() {
    return (
      <div className="ParkingForm">
        <Form horizontal>
          <FormGroup>
            <Col sm={7} smOffset={1} xs={12}>
              <ControlLabel>IoT Hub Connection String</ControlLabel>
              <FormControl type="text" placeholder="Connection String" value={this.props.connectionString} onChange={() => { this.handleChange({ refreshResult: false }) } } ref="connectionStringInput"/>
            </Col>
            <Col sm={3} xs={12}>
              <ControlLabel>Consumer Group</ControlLabel>
              <FormControl type="text" placeholder="consumerGroup" value={this.props.consumerGroup} onChange={() => { this.handleChange({ refreshResult: false }) } } ref="consumerGroupInput"/>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={1} smOffset={5} xs={1} xsOffset={5} id="Parking">
              <Button onClick={() => { this.handleChange({ refreshResult: true }) } }>Start Monitoring</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default ParkingForm;
