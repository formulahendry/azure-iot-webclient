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
    if (!this.props.consumerGroup || !this.props.connectionString) {
      this.setState({
        result: 'Input could not be empty.'
      });
      return;
    }
    if (typeof (EventSource) === "undefined") {
      this.setState({
        result: this.state.result = 'Currently, the monitor function does not support your browser.\nPlease use Chrome, Firefox, Opera or Safari.\nThe support for IE/Edge is coming soon.'
      })
      return;
    }
    try {
      ga('send', 'event', 'Monitor', 'start');
    }
    catch (e) {
    }
    var source = new EventSource(`//azure-iot-web-api.azurewebsites.net/message/monitor?consumerGroup=${this.props.consumerGroup}&connectionString=${encodeURIComponent(this.props.connectionString)}`);
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
        {this.state.result &&
          <pre className="ResultArea">{this.state.result}</pre>
        }
      </div>
    );
  }
}

export default MonitorResult;
