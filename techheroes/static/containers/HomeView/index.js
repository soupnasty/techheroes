import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';


export default class HomeView extends React.Component {

    static propTypes = {
        statusText: React.PropTypes.string,
        userName: React.PropTypes.string
    };

    render() {
        return (
            <div className="container">
              hey
            </div>
        );
    }
}
