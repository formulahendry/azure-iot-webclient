import React, { Component } from 'react';
import MonitorForm from './MonitorForm';
import MonitorResult from './MonitorResult';

class Monitor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connectionString: "HostName=iot-hub-hendry.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=FE98m4TB4e5J/RzCpgtMV8+WXiXuZeRnBN8WzlaZTJQ=",
      refreshResult: false
    };
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleUserInput(connectionString, refreshResult) {
    this.setState({
      connectionString: connectionString,
      refreshResult: refreshResult
    });
  }

  render() {
    return (
      <div className="Monitor">
        <h2>Monitor Device-To-Cloud Message</h2>
        <MonitorForm 
          connectionString={this.state.connectionString}
          onUserInput={this.handleUserInput}
        />
        <MonitorResult
          connectionString={this.state.connectionString}
          refreshResult={this.state.refreshResult}
        />
      </div>
    );
  }
}

export default Monitor;
