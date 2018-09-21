import React, { Component } from 'react';
import {NavLink} from "react-router-dom";


export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            loginStatus: false
        }
        this.handleLogout=this.handleLogout.bind(this);
    }

    handleLogout(e){
        e.preventDefault();
        this.props.logout();
    }


    render() {
        if (this.props.login) {
            return (
                <nav className="navbar navbar-expand-md navbar-light navbar-laravel">
                    <div className="container">
                        <div className="navbar-brand">
                            React Laravel
                        </div>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon">

                            </span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">

                            </ul>
                            <ul className="navbar-nav mc-auto">
                                <li className="nav-item dropdown">
                                    <a id="navbarDropdown" className="nav-link dropdown-toggle" role="button"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="caret">

                                    </span>
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <NavLink to="/" onClick={this.handleLogout}  className="dropdown-item" replace>
                                            Logout
                                        </NavLink>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            )
        } else {
            return (
                <nav className="navbar navbar-expand-md navbar-light navbar-laravel">
                    <div className="container">
                        <div className="navbar-brand">
                            React Laravel
                        </div>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link" replace
                                         activeClassName="selected">Login</NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            )
        }
    }

}