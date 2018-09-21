import React, { Component } from 'react';
import {HashRouter as Router, Link} from 'react-router-dom';



export default class Navigation extends Component {

    render(){
        return (
            <div>
                <Router>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to='/home'>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/companies'>Companies</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link disabled" to='/employees'>Employees</Link>
                                </li>
                            </ul>

                        </div>
                    </nav>
                </Router>
            </div>
        )

    }

}