import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';


export default class Pricing extends Component {

  render() {
    return (
      <div className='modal fade' id='modal1' tabIndex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content modal-popup'>
            <a href='#' className='close-link'><i className='icon_close_alt2' /></a>
            <h3 className='white'>Sign Up</h3>
            <form action='' className='popup-form'>
              <input type='text' className='form-control form-white' placeholder='Full Name' />
              <input type='text' className='form-control form-white' placeholder='Email Address' />
              <div className='dropdown'>
                <button id='dLabel' className='form-control form-white dropdown' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                      Pricing Plan
                    </button>
                <ul className='dropdown-menu animated fadeIn' role='menu' aria-labelledby='dLabel'>
                  <li className='animated lightSpeedIn'><a href='#'>1 month membership ($150)</a></li>
                  <li className='animated lightSpeedIn'><a href='#'>3 month membership ($350)</a></li>
                  <li className='animated lightSpeedIn'><a href='#'>1 year membership ($1000)</a></li>
                  <li className='animated lightSpeedIn'><a href='#'>Free trial class</a></li>
                </ul>
              </div>
              <div className='checkbox-holder text-left'>
                <div className='checkbox'>
                  <input type='checkbox' value='None' id='squaredOne' name='check' />
                  <label htmlFor='squaredOne'><span>I Agree to the <strong>Terms &amp; Conditions</strong></span></label>
                </div>
              </div>
              <button type='submit' className='btn btn-submit'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
