import React, { Component } from 'react';
import { Link } from 'react-router'
import { Col, Glyphicon } from 'react-bootstrap';
import $ from 'jquery';
import './MonitorResult.css';

class MonitorResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      resultDetail: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.refreshResult === true) {
        this.monitorD2CMessage();
    }
  }

  monitorD2CMessage() {
    this.setState({
      result: 'The function is coming soon!'
    });
    var EventHubClient = require('azure-event-hubs').Client;

    var client = EventHubClient.fromConnectionString(this.props.connectionString);
    client.open()
      .then(client.getPartitionIds.bind(client))
      .then(function (partitionIds) {
        return partitionIds.map(function (partitionId) {
          return client.createReceiver('$Default', partitionId, { 'startAfterTime': Date.now() }).then(function (receiver) {
            console.log('Created partition receiver: ' + partitionId)
            receiver.on('errorReceived', this.printError);
            receiver.on('message', this.printMessage);
          });
        });
      })
      .catch(this.printError);
  }

  printError(err) {
    console.log(err.message);
  };

  printMessage(message) {
    console.log('Message received: ');
    console.log(JSON.stringify(message.body));
    console.log('');
  };

  render() {
    return (
      <div className="MonitorResult">      
          <h4>{this.state.result}</h4>
          <div dangerouslySetInnerHTML={{__html: this.state.resultDetail}} />
      </div>
    );
  }
}

export default MonitorResult;
