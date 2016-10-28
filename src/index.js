import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './components/App';
import D2CMessage from './components/D2CMessage/D2CMessage';
import Monitor from './components/Monitor/Monitor';
import Parking from './components/Parking/Parking';
import './index.css';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={D2CMessage} />
      <Route path="monitor" component={Monitor} />
      <Route path="parking" component={Parking} />
    </Route>
  </Router>),
  document.getElementById('root')
);
