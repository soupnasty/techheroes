import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// TODO
// import ApiClient from './helpers/ApiClient';

import Root from './containers/Root/Root';
import configureStore from './redux/store/configureStore';

// TODO
// const client = new ApiClient();

const target = document.getElementById('app');

const store = configureStore(window.INITIAL_STATE, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

const node = (
  <Root store={store} history={history} />
);

const user = {};


ReactDOM.render(node, target);
