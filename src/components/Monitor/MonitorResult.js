import React, { Component } from 'react';
import { Link } from 'react-router'
import { Col, Glyphicon } from 'react-bootstrap';
import $ from 'jquery';
import './MonitorResult.css';

class MonitorResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.refreshResult === true) {
        this.monitorD2CMessage();
    }
  }

  monitorD2CMessage() {
    var source = new EventSource(`//azure-iot-web-api.azurewebsites.net/message/monitor?connectionString=${encodeURIComponent(this.props.connectionString)}`);
    source.onmessage = (event) => {
      console.log(event.data)
      this.setState({
        result: this.state.result += '\n' + event.data
      })
    };
  }

  render() {
    return (
      <div className="MonitorResult">      
          <pre className="ResultArea">{this.state.result}</pre>
      </div>
    );
  }
}

export default MonitorResult;
