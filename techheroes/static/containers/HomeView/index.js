import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Footer, Header, NavBar, Pricing } from '../../components'

// import styles from './index.scss'

export default class HomeView extends React.Component {

  render() {
    return (
      <span>
        <NavBar />
        <Header />
        <section>
          <div className='cut cut-top' />
          <div className='container'>
            <div className='row intro-tables'>
              <div className='col-md-4'>
                <div className='intro-table intro-table-first'>
                  <h5 className='white heading'>{'Today\'s Schedule'}</h5>
                  <div className='owl-carousel owl-schedule bottom'>
                    <div className='item'>
                      <div className='schedule-row row'>
                        <div className='col-xs-6'>
                          <h5 className='regular white'>Early Exercise</h5>
                        </div>
                        <div className='col-xs-6 text-right'>
                          <h5 className='white'>8:30 - 10:00</h5>
                        </div>
                      </div>
                      <div className='schedule-row row'>
                        <div className='col-xs-6'>
                          <h5 className='regular white'>Muscle Building</h5>
                        </div>
                        <div className='col-xs-6 text-right'>
                          <h5 className='white'>8:30 - 10:00</h5>
                        </div>
                      </div>
                      <div className='schedule-row row'>
                        <div className='col-xs-6'>
                          <h5 className='regular white'>Cardio</h5>
                        </div>
                        <div className='col-xs-6 text-right'>
                          <h5 className='white'>8:30 - 10:00</h5>
                        </div>
                      </div>
                    </div>
                    <div className='item'>
                      <div className='schedule-row row'>
                        <div className='col-xs-6'>
                          <h5 className='regular white'>Early Exercise</h5>
                        </div>
                        <div className='col-xs-6 text-right'>
                          <h5 className='white'>8:30 - 10:00</h5>
                        </div>
                      </div>
                      <div className='schedule-row row'>
                        <div className='col-xs-6'>
                          <h5 className='regular white'>Muscle Building</h5>
                        </div>
                        <div className='col-xs-6 text-right'>
                          <h5 className='white'>8:30 - 10:00</h5>
                        </div>
                      </div>
                      <div className='schedule-row row'>
                        <div className='col-xs-6'>
                          <h5 className='regular white'>Cardio</h5>
                        </div>
                        <div className='col-xs-6 text-right'>
                          <h5 className='white'>8:30 - 10:00</h5>
                        </div>
                      </div>
                    </div>
                    <div className='item'>
                      <div className='schedule-row row'>
                        <div className='col-xs-6'>
                          <h5 className='regular white'>Early Exercise</h5>
                        </div>
                        <div className='col-xs-6 text-right'>
                          <h5 className='white'>8:30 - 10:00</h5>
                        </div>
                      </div>
                      <div className='schedule-row row'>
                        <div className='col-xs-6'>
                          <h5 className='regular white'>Muscle Building</h5>
                        </div>
                        <div className='col-xs-6 text-right'>
                          <h5 className='white'>8:30 - 10:00</h5>
                        </div>
                      </div>
                      <div className='schedule-row row'>
                        <div className='col-xs-6'>
                          <h5 className='regular white'>Cardio</h5>
                        </div>
                        <div className='col-xs-6 text-right'>
                          <h5 className='white'>8:30 - 10:00</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='intro-table intro-table-hover'>
                  <h5 className='white heading hide-hover'>Premium Membership</h5>
                  <div className='bottom'>
                    <h4 className='white heading small-heading no-margin regular'>Register Today</h4>
                    <h4 className='white heading small-pt'>20% Discount</h4>
                    <a href='#' className='btn btn-white-fill expand'>Register</a>
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='intro-table intro-table-third'>
                  <h5 className='white heading'>Happy Clients</h5>
                  <div className='owl-testimonials bottom'>
                    <div className='item'>
                      <h4 className='white heading content'>I couldn't be more happy with the results!</h4>
                      <h5 className='white heading light author'>Adam Jordan</h5>
                    </div>
                    <div className='item'>
                      <h4 className='white heading content'>I can't believe how much better I feel!</h4>
                      <h5 className='white heading light author'>Greg Pardon</h5>
                    </div>
                    <div className='item'>
                      <h4 className='white heading content'>Incredible transformation and I feel so healthy!</h4>
                      <h5 className='white heading light author'>Christina Goldman</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id='services' className='section section-padded'>
          <div className='container'>
            <div className='row text-center title'>
              <h2>Services</h2>
              <h4 className='light muted'>Achieve the best results with our wide variety of training options!</h4>
            </div>
            <div className='row services'>
              <div className='col-md-4'>
                <div className='service'>
                  <div className='icon-holder'>
                    <img src='img/icons/heart-blue.png' alt='' className='icon' />
                  </div>
                  <h4 className='heading'>Cardio Training</h4>
                  <p className='description'>A elementum ligula lacus ac quam ultrices a scelerisque praesent vel suspendisse scelerisque a aenean hac montes.</p>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='service'>
                  <div className='icon-holder'>
                    <img src='img/icons/guru-blue.png' alt='' className='icon' />
                  </div>
                  <h4 className='heading'>Yoga Pilates</h4>
                  <p className='description'>A elementum ligula lacus ac quam ultrices a scelerisque praesent vel suspendisse scelerisque a aenean hac montes.</p>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='service'>
                  <div className='icon-holder'>
                    <img src='img/icons/weight-blue.png' alt='' className='icon' />
                  </div>
                  <h4 className='heading'>Power Training</h4>
                  <p className='description'>A elementum ligula lacus ac quam ultrices a scelerisque praesent vel suspendisse scelerisque a aenean hac montes.</p>
                </div>
              </div>
            </div>
          </div>
          <div className='cut cut-bottom' />
        </section>

        <section id='team' className='section gray-bg'>
          <div className='container'>
            <div className='row title text-center'>
              <h2 className='margin-top'>Team</h2>
              <h4 className='light muted'>We're a dream team!</h4>
            </div>
            <div className='row'>
              <div className='col-md-4'>
                <div className='team text-center'>
                  <div className='cover' style={{ backgroundSize: 'cover' }}>
                    <div className='overlay text-center'>
                      <h3 className='white'>$69.00</h3>
                      <h5 className='light light-white'>1 - 5 sessions / month</h5>
                    </div>
                  </div>
                  <img src='img/team/team3.jpg' alt='Team Image' className='avatar' />
                  <div className='title'>
                    <h4>Ben Adamson</h4>
                    <h5 className='muted regular'>Fitness Instructor</h5>
                  </div>
                  <button data-toggle='modal' data-target='#modal1' className='btn btn-blue-fill'>Sign Up Now</button>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='team text-center'>
                  <div className='cover' style={{ backgroundSize: 'cover' }}>
                    <div className='overlay text-center'>
                      <h3 className='white'>$69.00</h3>
                      <h5 className='light light-white'>1 - 5 sessions / month</h5>
                    </div>
                  </div>
                  <img src='img/team/team1.jpg' alt='Team Image' className='avatar' />
                  <div className='title'>
                    <h4>Eva Williams</h4>
                    <h5 className='muted regular'>Personal Trainer</h5>
                  </div>
                  <a href='#' data-toggle='modal' data-target='#modal1' className='btn btn-blue-fill ripple'>Sign Up Now</a>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='team text-center'>
                  <div className='cover' style={{ backgroundSize: 'cover' }}>
                    <div className='overlay text-center'>
                      <h3 className='white'>$69.00</h3>
                      <h5 className='light light-white'>1 - 5 sessions / month</h5>
                    </div>
                  </div>
                  <img src='img/team/team2.jpg' alt='Team Image' className='avatar' />
                  <div className='title'>
                    <h4>John Phillips</h4>
                    <h5 className='muted regular'>Personal Trainer</h5>
                  </div>
                  <a href='#' data-toggle='modal' data-target='#modal1' className='btn btn-blue-fill ripple'>Sign Up Now</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id='pricing' className='section'>
          <div className='container'>
            <div className='row title text-center'>
              <h2 className='margin-top white'>Pricing</h2>
              <h4 className='light white'>Choose your favorite pricing plan and sign up today!</h4>
            </div>
            <div className='row no-margin'>
              <div className='col-md-7 no-padding col-md-offset-5 pricings text-center'>
                <div className='pricing'>
                  <div className='box-main active' data-img='img/pricing1.jpg'>
                    <h4 className='white'>Yoga Pilates</h4>
                    <h4 className='white regular light'>$850.00 <span className='small-font'>/ year</span></h4>
                    <a href='#' data-toggle='modal' data-target='#modal1' className='btn btn-white-fill'>Sign Up Now</a>
                    <i className='info-icon icon_question' />
                  </div>
                  <div className='box-second active'>
                    <ul className='white-list text-left'>
                      <li>One Personal Trainer</li>
                      <li>Big gym space for training</li>
                      <li>Free tools &amp; props</li>
                      <li>Free locker</li>
                      <li>Free before / after shower</li>
                    </ul>
                  </div>
                </div>
                <div className='pricing'>
                  <div className='box-main' data-img='img/pricing2.jpg'>
                    <h4 className='white'>Cardio Training</h4>
                    <h4 className='white regular light'>$100.00 <span className='small-font'>/ year</span></h4>
                    <a href='#' data-toggle='modal' data-target='#modal1' className='btn btn-white-fill'>Sign Up Now</a>
                    <i className='info-icon icon_question' />
                  </div>
                  <div className='box-second'>
                    <ul className='white-list text-left'>
                      <li>One Personal Trainer</li>
                      <li>Big gym space for training</li>
                      <li>Free tools &amp; props</li>
                      <li>Free locker</li>
                      <li>Free before / after shower</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='section section-padded blue-bg'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2'>
                <div className='owl-twitter owl-carousel'>
                  <div className='item text-center'>
                    <i className='icon fa fa-twitter' />
                    <h4 className='white light'>To enjoy the glow of good health, you must exercise.</h4>
                    <h4 className='light-white light'>#health #training #exercise</h4>
                  </div>
                  <div className='item text-center'>
                    <i className='icon fa fa-twitter' />
                    <h4 className='white light'>To enjoy the glow of good health, you must exercise.</h4>
                    <h4 className='light-white light'>#health #training #exercise</h4>
                  </div>
                  <div className='item text-center'>
                    <i className='icon fa fa-twitter' />
                    <h4 className='white light'>To enjoy the glow of good health, you must exercise.</h4>
                    <h4 className='light-white light'>#health #training #exercise</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Pricing />

        <Footer />
        {/* Holder for mobile navigation */}
        <div className='mobile-nav'>
          <ul />
          <a href='#' className='close-link'><i className='arrow_up' /></a>
        </div>
      </span>
    );
  }
}
//
// {/*<div class="preloader">
//   <img src="img/loader.gif" alt="Preloader image" />
// </div>*/}
