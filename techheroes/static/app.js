import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import classNames from 'classnames';
import { asyncConnect } from 'redux-async-connect';

// import { authLogoutAndRedirect } from './redux/actions/auth';
// import './styles/main.scss';

// @asyncConnect([{}])

// @connect(
//   state => ({ })
// )

export default class App extends React.Component {

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
