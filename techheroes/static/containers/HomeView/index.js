import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Footer, Header, NavBar, Pricing } from '../../components'

// import styles from './index.scss'
// { test: /\.scss$/, exclude: /node_modules/, loaders: 'style-loader!css-loader!autoprefixer-loader!sass-loader' }
export default class HomeView extends React.Component {

  render() {
    console.log(this.props)
    return (

      <span>
        hey there
      </span>
    );
  }
}
//
// {/*<div class="preloader">
//   <img src="img/loader.gif" alt="Preloader image" />
// </div>*/}
