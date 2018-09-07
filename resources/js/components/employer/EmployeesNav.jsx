import React, { Component } from 'react';
import {HashRouter as Router, Link, Route} from 'react-router-dom';
import EmployerList from './EmployerList';
import EmployerAdd from './EmployerAdd';
import EmployerEdit from './EmployerEdit';

export default class EmployeesNav extends Component {
    render(){
        return (
            <div>
                <Router>
                    <div>
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <Link  className="nav-link btn btn-primary" to="/employees">Show all employers</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link btn btn-success" to="/employees/add">Add new Employer</Link>
                                    </li>
                                </ul>

                            </div>
                        </nav>


                           <Route exact path="/employees" component={EmployerList}/>
                           <Route exact path="/employees/add" component={EmployerAdd}/>
                           <Route exact path="/employees/edit/:id" component={EmployerEdit}/>
                    </div>
                </Router>
            </div>
        )
    }
}