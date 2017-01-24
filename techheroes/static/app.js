import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import classNames from 'classnames';
import { asyncConnect } from 'redux-async-connect';

// import { authLogoutAndRedirect } from './redux/actions/auth';
// import './styles/main.scss';

@asyncConnect([{}])

@connect(
  state => ({ })
)

export default class App extends React.Component {

    // TODO
    // logout = () => {
    //     this.props.dispatch(authLogoutAndRedirect());
    // };

    // goToIndex = () => {
    //     this.props.dispatch(push('/'));
    // };
    //
    // goToProtected = () => {
    //     this.props.dispatch(push('/protected'));
    // };

  render() {
    console.log('hi')
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
