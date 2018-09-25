import React, { Component } from "react";
import ReactDOM from "react-dom";
import {HashRouter as Router, Route,Switch} from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import Home from "./Home";
import Welcome from "./Welcome";
import axios, {post, put} from "axios";
import PrivateRoute from "./PrivateRoute";
import Navigation from "./Navigation";
import CompaniesNav from "./company/CompaniesNav";
import EmployeesNav from "./employer/EmployeesNav";

export default class Index extends Component {

    constructor(props){
        super(props);
        this.state = {
            token:"",
            loginStatus: false
        }
        this.checkLoginStatus= this.checkLoginStatus.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    checkLoginStatus(){
        return this.state.loginStatus;
    }


    componentDidMount() {
        const loginToken = localStorage.token;
        if(loginToken.length !== 0 ){
            axios
                .post("/api/me", {}, {
                     headers: {"Authorization": "Bearer " + loginToken},
                })
                .then((response) => {
                    this.setState({
                        token: loginToken,
                        loginStatus: true
                    })
               })
                .catch((e) => {
                    this.setState({loginStatus: false});
                    throw new Error(e);
            })
        }
    }

    handleLogin(data){
        axios
            .post("api/login",data)
            .then(response=>{
                this.setState({token:response.data.token});
                localStorage.setItem("token",response.data.token )
            })
             .then(() => {
                 this.setState({loginStatus: true});

            })
            .catch(e=>{console.log(e)})
    }

    handleLogout() {
        axios
            .post("/api/logout", {token: this.state.token}, {
               headers: {"Authorization": "Bearer " + this.state.token},
             })
            .then((response) => {
                if(response.data.success ){
                    return true;
                }
                else {
                    this.setState({loginStatus: false});
                    this.setState({token: ""});
                    localStorage.token = "";
                }
            })
            .catch((e) => {
                throw new Error(e)
            })

    };

    render() {
        return (
            <Router>
                <div className="container">
                    <Header
                        login={this.checkLoginStatus()}
                        logout={this.handleLogout}
                    />

                    <Switch>
                        <Route exact strict
                               path="/welcome"
                               component={Welcome}
                        />
                        <Route exact strict
                               path="/login"
                               render={(props) =>
                                   <Login
                                         handleLogin={this.handleLogin}
                                         loginStatus={this.state.loginStatus} {...props}
                                   />}
                        />
                        <PrivateRoute
                            path="/"
                            loginStatus={this.state.loginStatus}
                            component={Navigation}
                            token={this.state.token}
                        />
                    </Switch>

                        <PrivateRoute
                            path="/home"
                            loginStatus={this.state.loginStatus}
                            component={Home}
                            token={this.state.token}
                        />
                        <PrivateRoute
                            path="/companies"
                            component={CompaniesNav}
                            loginStatus={this.state.loginStatus} token={this.state.token}
                        />
                        <PrivateRoute
                            path="/employees"
                            component={EmployeesNav}
                            loginStatus={this.state.loginStatus} token={this.state.token}
                        />
                </div>
            </Router>
        );
    }
}

if (document.getElementById("app")) {
    ReactDOM.render(<Index />, document.getElementById("app"));
}
