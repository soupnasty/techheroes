import 'babel-polyfill';
import ApiClient from './helpers/ApiClient';
import { authLoginUserSuccess } from './actions/auth';
import { browserHistory } from 'react-router';
import createStore from './redux/create';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root/Root';
import { syncHistoryWithStore } from 'react-router-redux';
import useScroll from 'scroll-behavior/lib/useStandardScroll';

const target = document.getElementById('root');

// const store = configureStore(window.INITIAL_STATE, browserHistory);
const client = new ApiClient();
const _browserHistory = useScroll(() => browserHistory)();
const store = createStore(_browserHistory, client, window.__data);
const history = syncHistoryWithStore(_browserHistory, store);

const node = (
    <Root store={store} history={history}/>
);

const token = sessionStorage.getItem('token');
let user = {};
try {
    user = JSON.parse(sessionStorage.getItem('user'));
} catch (e) {
    // Failed to parse
}

if (token !== null) {
    store.dispatch(authLoginUserSuccess(token, user));
}

ReactDOM.render(node, target);
