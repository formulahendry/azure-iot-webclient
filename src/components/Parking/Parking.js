import React, { Component } from 'react';
import ParkingForm from './ParkingForm';
import ParkingResult from './ParkingResult';

class Parking extends Component {
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
      <div className="Parking">
        <h2>Parking Status Monitor</h2>
        <ParkingForm 
          connectionString={this.state.connectionString}
          consumerGroup={this.state.consumerGroup}
          onUserInput={this.handleUserInput}
        />
        <ParkingResult
          connectionString={this.state.connectionString}
          consumerGroup={this.state.consumerGroup}
          refreshResult={this.state.refreshResult}
        />
      </div>
    );
  }
}

export default Parking;
