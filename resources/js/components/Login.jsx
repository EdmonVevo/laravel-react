import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

export default class Login extends Component {
//
    constructor(props){
        super(props);
        this.handleChange= this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
        this.state = {
                email:'',
                password:''
        }
    }

    handleChange(e){
        this.setState({
                [e.target.name]: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.handleLogin(this.state);
    }


    render(){
        if(this.props.loginStatus) {
            return (
                <Redirect to='/companies'/>
            )
        }
        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-body">
                                    <form
                                        onSubmit={this.handleSubmit}>
                                        <div className="form-group row">
                                            <label htmlFor="email"
                                                   className="col-sm-4 col-form-label text-md-right">Email</label>
                                            <div className="col-md-6">
                                                <input
                                                    onChange={this.handleChange} id="email" type="email" className="form-control" name="email" value={this.state.email} required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="password"
                                                   className="col-sm-4 col-form-label text-md-right">Password</label>
                                            <div className="col-md-6">
                                                <input
                                                    onChange={this.handleChange} id="password" type="password" className="form-control" autoComplete="current-password"
                                                       name="password" value={this.state.password} required/>
                                            </div>
                                        </div>
                                        <div className="form-group row mb-0">
                                            <div className="col-md-6 offset-md-4">
                                                <button type="submit" className="btn btn-primary">Login</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
