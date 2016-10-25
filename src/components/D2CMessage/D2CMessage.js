import React, { Component } from 'react';
import D2CMessageResult from './D2CMessageResult';
import D2CMessageForm from './D2CMessageForm';

class D2CMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      d2cMessage: "test message",
      deviceConnectionString: props.location.query.debug === "true" ? "HostName=iot-hub-hendry.azure-devices.net;DeviceId=myFirstDevice;SharedAccessKey=O8u6OXbQt/bJ4SkmO7E+GyP0H1PgIlTx/wqMxC0J9zE=" : "",
      refreshResult: false
    };
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleUserInput(d2cMessage, deviceConnectionString, refreshResult) {
    this.setState({
      d2cMessage: d2cMessage,
      deviceConnectionString: deviceConnectionString,
      refreshResult: refreshResult
    });
  }

  render() {
    return (
      <div className="D2CMessage">
        <h2>Send Device-To-Cloud Message</h2>
        <D2CMessageForm 
          d2cMessage={this.state.d2cMessage}
          deviceConnectionString={this.state.deviceConnectionString}
          onUserInput={this.handleUserInput}
        />
        <D2CMessageResult
          d2cMessage={this.state.d2cMessage}
          deviceConnectionString={this.state.deviceConnectionString}
          refreshResult={this.state.refreshResult}
        />
      </div>
    );
  }
}

export default D2CMessage;
