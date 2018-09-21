import React, { Component } from 'react';
import {HashRouter as Router, Link, Route} from 'react-router-dom';
import EmployerList from './EmployerList';
import EmployerAdd from './EmployerAdd';
import EmployerEdit from './EmployerEdit';

export default class EmployeesNav extends Component {

    constructor(props){
        super(props);
    }

    handleEmployerAdd(employer) {

        const localToken = localStorage.getItem('token');
        axios.post('/api/employees/store', employer, {
            headers: {'Authorization': 'Bearer ' + localToken},
        })
            .then(response => {
                    return true;
                }
            ).catch((e) => {
            console.log(e);
        });
    }
    handleEmployerUpdate(id,employer){
        axios.put('/api/employees/update/' + id , employer,{
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
        })
            .then(response=>{
                return true;

            })
            .catch(e=>console.log(e));
    }
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


                           <Route exact path="/employees"
                                  render = {()=><EmployerList token={this.props.token}/>} />
                           <Route exact path="/employees/add"
                                  render = {()=><EmployerAdd token={this.props.token} handleEmployerAdd={this.handleEmployerAdd} />} />
                           <Route exact path="/employees/edit/:id"
                                  render = {(props)=><EmployerEdit token={this.props.token} handleEmployerUpdate={this.handleEmployerUpdate}  {...props}/>} />
                    </div>
                </Router>
            </div>
        )
    }
}