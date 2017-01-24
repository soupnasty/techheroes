import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';


export default class NavBar extends Component {

  render() {
    return (
      <nav className='navbar'>
        <div className='container'>
          {/* Brand and toggle get grouped for better mobile display */}
          <div className='navbar-header'>
            <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1'>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar' />
              <span className='icon-bar' />
              <span className='icon-bar' />
            </button>
            <a className='navbar-brand' href='#'><img src='img/logo.png' data-active-url='img/logo-active.png' alt='' /></a>
          </div>
          {/* Collect the nav links, forms, and other content for toggling */}
          <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
            <ul className='nav navbar-nav navbar-right main-nav'>
              <li><a href='#intro'>Intro</a></li>
              <li><a href='#services'>Services</a></li>
              <li><a href='#team'>Team</a></li>
              <li><a href='#pricing'>Pricing</a></li>
              <li><a href='#' data-toggle='modal' data-target='#modal1' className='btn btn-blue'>Sign Up</a></li>
            </ul>
          </div>
          {/* /.navbar-collapse */}
        </div>
        {/* /.container-fluid */}
      </nav>
    );
  }
}
