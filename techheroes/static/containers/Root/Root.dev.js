import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { ReduxAsyncConnect } from 'redux-async-connect';

import routes from '../../routes';
import DevTools from './DevTools';

export default class Root extends React.Component {


  render() {
    return (
      <div>
        <Provider store={this.props.store}>
          <div>
            <Router
              render={props => <ReduxAsyncConnect {...props} />}
              history={this.props.history}
              >
              {routes}
            </Router>
            <DevTools />
          </div>
        </Provider>
      </div>
    );
  }
}
