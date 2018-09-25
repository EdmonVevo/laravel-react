import React, { Component } from "react";
import {HashRouter as Router, Link, Route} from "react-router-dom";
import CompanyList from "./CompanyList";
import CompanyAdd from "./CompanyAdd";
import CompanyEdit from "./CompanyEdit"

export default class CompaniesNav extends Component {

    constructor(props){
        super(props);
    }

    handleCompanyAdd(company) {
        const localToken = localStorage.getItem("token");
        axios
            .post("/api/companies", company, {
                 headers: {
                     "Authorization": "Bearer " + localToken
                  },
             })
            .then(response => {

            })
            .catch((e) => {
              console.log(e);
        });
    }
    handleCompanyUpdate(id,company){
        axios
            .put("/api/companies/" + id , company,{
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    },
            })
            .then(response=>{
                return true;
            })
            .catch((e)=>{
                console.log(e)
            });
    }

    render(){
        return (
                <div>
                    <Router>
                        <div>
                            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                                <div className="collapse navbar-collapse"
                                     id="navbarSupportedContent">
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item">
                                            <Link className="nav-link btn btn-primary"
                                                  to="/companies">Show all companies</Link>
                                        </li>
                                        <li className="nav-item ">
                                            <Link className="nav-link btn btn-success"
                                                  to="/companies/add">Add new Company</Link>
                                        </li>
                                    </ul>

                                </div>
                            </nav>


                            <Route exact strict path="/companies"
                                   render = {()=>
                                       <CompanyList
                                           token={this.props.token}
                                       />}
                            />
                            <Route exact strict path="/companies/add"
                                   render = {()=>
                                       <CompanyAdd
                                           token={this.props.token}
                                           handleCompanyAdd={this.handleCompanyAdd}
                                       /> }
                            />
                            <Route exact strict path="/companies/:id"
                                  render = {(props)=>
                                      <CompanyEdit
                                          token={this.props.token}
                                          handleCompanyUpdate={this.handleCompanyUpdate} {...props}
                                      />}
                            />
                        </div>
                    </Router>
                </div>
        )
    }
}