import React, { Component } from 'react';
import {HashRouter as Router, Link, Route} from 'react-router-dom';
import Home from './Home'
import CompaniesNav from './company/CompaniesNav'
import EmployeesNav from './employer/EmployeesNav'

export default class Header extends Component {

    render(){
        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to='/'>Home</Link>
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

                    <Route path="/" exact component={Home}/>
                    <Route path="/companies"  component={CompaniesNav}/>
                    <Route path="/employees"  component={EmployeesNav}/>
                </div>
            </Router>


        )
    }
}