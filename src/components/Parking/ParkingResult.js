import React, { Component } from 'react';
import { Link } from 'react-router'
import { Col, Glyphicon, Row } from 'react-bootstrap';
import $ from 'jquery';
import './ParkingResult.css';
import car from './car.png';

class ParkingResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      hasCar: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.refreshResult === true) {
        this.ParkingD2CMessage();
    }
  }

  ParkingD2CMessage() {
    if (!this.props.consumerGroup || !this.props.connectionString) {
      this.setState({
        result: 'Input could not be empty.'
      });
      return;
    }
    if (typeof (EventSource) === "undefined") {
      this.setState({
        result: this.state.result = 'Currently, the Parking function does not support your browser.\nPlease use Chrome, Firefox, Opera or Safari.\nThe support for IE/Edge is coming soon.'
      })
      return;
    }
    var source = new EventSource(`//azure-iot-web-api.azurewebsites.net/message/monitor?consumerGroup=${this.props.consumerGroup}&connectionString=${encodeURIComponent(this.props.connectionString)}`);
    source.onmessage = (event) => {
      console.log(event.data)
      this.setState({
        result: this.state.result += '\n' + event.data
      })
      if (event.data.indexOf('car') >= 0) {
        this.setState({
          hasCar: true
        })
      } else {
        this.setState({
          hasCar: false
        })
      }
    };
  }

  render() {
    return (
      <div className="ParkingResult">    
        <div className="ParkingArea">
          <div id='my-car'>
             {this.state.hasCar ? (
               <div className="parking-space car">
                 <img src={car} />
               </div>
             ) : (
               <div className="parking-space">
               </div>
             )}
          </div>
          <div>
            <div className="parking-space">
            </div>
          </div>
          <div>
            <div className="parking-space">
            </div>
          </div>
          <div>
            <div className="parking-space car">
              <img src={car} />
            </div>
          </div>
          <div>
            <div className="parking-space car">
              <img src={car} />
            </div>
          </div>
          <div>
            <div className="parking-space">
            </div>
          </div>
        </div>
        <div className="console">
          {this.state.result &&
            <pre className="ResultArea">{this.state.result}</pre>
          }
        </div>
      </div>
    );
  }
}

export default ParkingResult;
