import React, { Component } from 'react';
import './ParkingResult.css';

class ParkingResult extends Component {
  constructor(props) {
    super(props);
    this.source = null;
    this.state = {
      result: "",
      carStatus: "false"
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.action === 'Start') {
      console.log('Start')
      this.ParkingD2CMessage();
    } else if (nextProps.action === 'Stop') {
      console.log('Stop')
      this.source.close();
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
        result: 'Currently, the Parking function does not support your browser.\nPlease use Chrome, Firefox, Opera or Safari.\nThe support for IE/Edge is coming soon.'
      })
      return;
    }
    this.source = new EventSource(`//azure-iot-web-api.azurewebsites.net/message/monitor?consumerGroup=${this.props.consumerGroup}&connectionString=${encodeURIComponent(this.props.connectionString)}`);
    this.source.onmessage = (event) => {
      console.log(`[raw data]: ${event.data}`)
      this.setState({
        result: this.state.result + '\n' + event.data
      })
      let status = this.getCarStatus(event.data);
      if (status !== '' && status !== this.state.carStatus) {
        this.setState({
          carStatus: status
        })
      }
    };
  }

  getCarStatus(data) {
    let status = this.getStatus(data);
    if (status === '') {
      try {
        let json = JSON.parse(data);
        let str = String.fromCharCode.apply(null, json.data)
        console.log(`[string data]: ${str}`)
        status = this.getStatus(str);
      }
      catch (e) {
      }
    }
    return status;
  }

  getStatus(str) {
    if (str.toLowerCase().indexOf('init') >= 0 || str.toLowerCase().indexOf('disturb') >= 0) {
      return 'init';
    } else if (str.toLowerCase().indexOf('false') >= 0) {
      return 'false';
    } else if (str.toLowerCase().indexOf('true') >= 0) {
      return 'true';
    }
    return '';
  }

  render() {
    return (
      <div className="ParkingResult">
        <div className="parking">
          <div className="parking-row">
            <div className="parking-road">&uarr;</div>
            <div className="parking-edge"></div>
            <div className="parking-cube">
              <div className={`parking-up ${this.state.carStatus}`}><div className='scan'></div>A-01</div>
              <div className="parking-down">A-02</div>
            </div>
            <div className="parking-cube">
              <div className="parking-up">A-03</div>
              <div className="parking-down">A-04</div>
            </div>
            <div className="parking-cube">
              <div className="parking-up true">A-05</div>
              <div className="parking-down">A-06</div>
            </div>
            <div className="parking-cube">
              <div className="parking-up">A-07</div>
              <div className="parking-down">A-08</div>
            </div>
            <div className="parking-cube">
              <div className="parking-up">A-09</div>
              <div className="parking-down">A-10</div>
            </div>
            <div className="parking-cube">
              <div className="parking-up">A-11</div>
              <div className="parking-down true">A-12</div>
            </div>
            <div className="parking-cube">
              <div className="parking-up">A-13</div>
              <div className="parking-down">A-14</div>
            </div>
            <div className="parking-cube">
              <div className="parking-up">A-15</div>
              <div className="parking-down">A-16</div>
            </div>
            <div className="parking-cube">
              <div className="parking-up">A-17</div>
              <div className="parking-down">A-18</div>
            </div>
            <div className="parking-cube">
              <div className="parking-up">A-19</div>
              <div className="parking-down">A-20</div>
            </div>
            <div className="parking-cube">
              <div className="parking-up">A-21</div>
              <div className="parking-down">A-22</div>
            </div>
            <div className="parking-cube">
              <div className="parking-up">A-23</div>
              <div className="parking-down">A-24</div>
            </div>
            <div className="parking-cube">
              <div className="parking-up">A-25</div>
              <div className="parking-down">A-26</div>
            </div>
            <div className="parking-cube">
              <div className="parking-up">A-27</div>
              <div className="parking-down">A-28</div>
            </div>
            <div className="parking-cube">
              <div className="parking-up">A-29</div>
              <div className="parking-down">A-30</div>
            </div>
          </div>
          <div className="parking-row">
            <div className="parking-road">&uarr;</div>
            <div className="parking-edge"></div>
            <div className="parking-cube">
              <div className="parking-up">B-01</div>
              <div className="parking-down">B-02</div>
            </div>
            <div className="parking-cube">
              <div className="parking-up">B-03</div>
              <div className="parking-down">B-04</div>
            </div>
            <div className="parking-cube">
              <div className="parking-up">B-05</div>
              <div className="parking-down">B-06</div>
            </div>
            <div className="parking-cube">
              <div className="parking-up">B-07</div>
              <div className="parking-down">B-08</div>
            </div>
            <div className="parking-cube">
              <div className="parking-up">B-09</div>
              <div className="parking-down">B-10</div>
            </div>
            <div className="parking-cube">
              <div className="parking-up">B-11</div>
              <div className="parking-down">B-12</div>
            </div>
            <div className="parking-cube">
              <div className="parking-up">B-13</div>
              <div className="parking-down">B-14</div>
            </div>
            <div className="parking-cube">
              <div className="parking-up">B-15</div>
              <div className="parking-down">B-16</div>
            </div>
            <div className="parking-cube">
              <div className="parking-up">B-17</div>
              <div className="parking-down">B-18</div>
            </div>
            <div className="parking-cube">
              <div className="parking-up">B-19</div>
              <div className="parking-down">B-20</div>
            </div>
            <div className="parking-cube">
              <div className="parking-up">B-21</div>
              <div className="parking-down">B-22</div>
            </div>
            <div className="parking-cube">
              <div className="parking-up">B-23</div>
              <div className="parking-down">B-24</div>
            </div>
            <div className="parking-cube">
              <div className="parking-up">B-25</div>
              <div className="parking-down">B-26</div>
            </div>
            <div className="parking-cube">
              <div className="parking-up">B-27</div>
              <div className="parking-down">B-28</div>
            </div>
            <div className="parking-cube">
              <div className="parking-up">B-29</div>
              <div className="parking-down">B-30</div>
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
