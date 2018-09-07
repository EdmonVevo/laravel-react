import React, { Component } from 'react';
import axios from 'axios';

export default class CompanyList extends Component {

    constructor(){
        super();
        this.state = {
            name:'',
            email:'',
            website:'',
            message:'',
            messageType:''
        };

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    };

    handleOnChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleOnSubmit(e) {
        e.preventDefault();
        let company_information = this.state;
        const { name, email, website } = this.state;
        if (name == '' || email == '' || website == '' ){
            this.setState({
                message:'Empty fields',
                messageType:'alert alert-danger'
            });
        }
        else {
            axios.post('/api/companies/store',company_information)
                .then(response=>{
                    console.log(response.data); this.setState({
                        message:'Company is updated',
                        messageType:'alert alert-success'
                    });
                })
                .catch(e=>console.log(e));
        }
    };


    render(){
        return(
            <div>
                <form className="add_company" onSubmit={this.handleOnSubmit}>
                    <div className={this.state.messageType} role="alert">
                        <h3>{this.state.message}</h3>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" className="form-control" id="name" placeholder="Enter name"  onChange={this.handleOnChange} value={this.state.name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" name="email" className="form-control" id="email" placeholder="Enter email" onChange={this.handleOnChange}  value={this.state.email}/>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="website">Website</label>
                        <input type="text" name="website" className="form-control" id="website" placeholder="Enter website"  onChange={this.handleOnChange}  value={this.state.website} />
                    </div>

                    <button type="submit" name="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}
