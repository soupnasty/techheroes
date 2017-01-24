import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';


export default class Header extends Component {

  render() {
    return (
      <header id='intro'>
        <div className='container'>
          <div className='table'>
            <div className='header-text'>
              <div className='row'>
                <div className='col-md-12 text-center'>
                  <h3 className='light white'>Take care of your body.</h3>
                  <h1 className='white typed'>{'It\'s the only place you have to live.'}</h1>
                  <span className='typed-cursor'>|</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
