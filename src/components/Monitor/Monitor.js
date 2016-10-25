import React, { Component } from 'react';
import MonitorForm from './MonitorForm';
import MonitorResult from './MonitorResult';

class Monitor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connectionString: props.location.query.debug === "true" ? "HostName=iot-hub-hendry.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=FE98m4TB4e5J/RzCpgtMV8+WXiXuZeRnBN8WzlaZTJQ=" : "",
      consumerGroup: "$Default",
      refreshResult: false
    };
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleUserInput(connectionString, consumerGroup, refreshResult) {
    this.setState({
      connectionString: connectionString,
      consumerGroup: consumerGroup,
      refreshResult: refreshResult
    });
  }

  render() {
    return (
      <div className="Monitor">
        <h2>Monitor Device-To-Cloud Message</h2>
        <MonitorForm 
          connectionString={this.state.connectionString}
          consumerGroup={this.state.consumerGroup}
          onUserInput={this.handleUserInput}
        />
        <MonitorResult
          connectionString={this.state.connectionString}
          consumerGroup={this.state.consumerGroup}
          refreshResult={this.state.refreshResult}
        />
      </div>
    );
  }
}

export default Monitor;
