import React, { Component } from 'react';
import axios from 'axios';

export default class EmployerAdd extends Component {



    constructor(){
        super();
        this.state = {
            firstname:'',
            lastname:'',
            company:'',
            email:'',
            phone:'',
            message:'',
            messageType:''
        };

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    };

    handleOnChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleOnSubmit(e){
        e.preventDefault();
        let employer_information = this.state;
        const { firstname,lastname,company,email,phone } = this.state;
        if (firstname == '' || lastname == '' || company == '' || email == '' || phone == '' ){
            this.setState({
                message:'You have empty fields',
                messageType:'alert alert-danger'
            });
        }
        else {
            axios.post('/api/employees/store',employer_information)
                .then(response=>{
                    console.log(response.data); this.setState({
                        message: response.data,
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
                        <label htmlFor="firstname">Firstname</label>
                        <input type="text" name="firstname" className="form-control" id="firstname" placeholder="Enter firstname"  onChange={this.handleOnChange} value={this.state.firstname}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Lastname</label>
                        <input type="text" name="lastname" className="form-control" id="lastname" placeholder="Enter lastname"  onChange={this.handleOnChange} value={this.state.lastname}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="company">Company</label>
                        <input type="text" name="company" className="form-control" id="company" placeholder="Enter company" onChange={this.handleOnChange}  value={this.state.company}/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" name="email" className="form-control" id="email" placeholder="Enter email" onChange={this.handleOnChange}  value={this.state.email}/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input type="text" name="phone" className="form-control" id="phone" placeholder="Enter phone"  onChange={this.handleOnChange}  value={this.state.phone} />
                    </div>

                    <button type="submit" name="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}
