import React, { Component } from 'react';
import $ from 'jquery';
import './D2CMessageResult.css';

class D2CMessageResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      resultDetail: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.refreshResult === true) {
      this.sendD2CMessage();
    }
  }

  sendD2CMessage() {
    if (!this.props.d2cMessage || !this.props.deviceConnectionString) {
      this.setState({
        result: 'Input could not be empty.'
      });
      return;
    }
    this.setState({
      result: 'Sending message to IoT Hub...'
    });
    try {
      // eslint-disable-next-line
      ga('send', 'event', 'D2CMessage', 'send');
    }
    catch (e) {
    }
    $.post(`https://azure-iot-web-api.azurewebsites.net/message?message=${this.props.d2cMessage}&connectionString=${encodeURIComponent(this.props.deviceConnectionString)}`)
      .done((data) => {
        this.setState({
          result: 'Message sent to IoT Hub.',
          resultDetail: ''
        })
      })
      .fail((xhr, textStatus, errorThrown) => {
        this.setState({
          result: 'Fail to send message to IoT Hub.',
          resultDetail: xhr.responseText
        })
        console.log(xhr)
      });
  }


  render() {
    return (
      <div className="D2CMessageResult">      
          <h4>{this.state.result}</h4>
          <div dangerouslySetInnerHTML={{__html: this.state.resultDetail}} />
      </div>
    );
  }
}

export default D2CMessageResult;