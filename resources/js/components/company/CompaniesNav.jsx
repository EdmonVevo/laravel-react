import React, { Component } from 'react';
import {HashRouter as Router, Link, Route} from 'react-router-dom';
import CompanyList from './CompanyList';
import CompanyAdd from './CompanyAdd';
import CompanyEdit from './CompanyEdit'

export default class CompaniesNav extends Component {





    render(){
        return (
                <div>
                    <Router>
                        <div>
                            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item">
                                            <Link className="nav-link btn btn-primary" to="/companies">Show all companies</Link>
                                        </li>
                                        <li className="nav-item ">
                                            <Link className="nav-link btn btn-success"  to="/companies/add">Add new Company</Link>
                                        </li>
                                    </ul>

                                </div>
                            </nav>


                            <Route exact path="/companies" component={CompanyList}/>
                            <Route exact path="/companies/add" component={CompanyAdd}/>
                            <Route exact path="/companies/edit/:id" component={CompanyEdit}/>
                        </div>
                    </Router>
                </div>
        )
    }
}