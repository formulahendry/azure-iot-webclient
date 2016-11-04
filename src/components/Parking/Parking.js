import React, { Component } from 'react';
import ParkingForm from './ParkingForm';
import ParkingResult from './ParkingResult';

class Parking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connectionString: props.location.query.debug === "true" ? "HostName=iot-hub-hendry.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=FE98m4TB4e5J/RzCpgtMV8+WXiXuZeRnBN8WzlaZTJQ=" : "",
      consumerGroup: "$Default",
      action: ''
    };
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleUserInput(connectionString, consumerGroup, action) {
    this.setState({
      connectionString: connectionString,
      consumerGroup: consumerGroup,
      action: action
    });
  }

  render() {
    return (
      <div className="ParkingPage">
        <h2>Parking Status Monitor</h2>
        <ParkingForm 
          connectionString={this.state.connectionString}
          consumerGroup={this.state.consumerGroup}
          onUserInput={this.handleUserInput}
        />
        <ParkingResult
          connectionString={this.state.connectionString}
          consumerGroup={this.state.consumerGroup}
          action={this.state.action}
        />
      </div>
    );
  }
}

export default Parking;
