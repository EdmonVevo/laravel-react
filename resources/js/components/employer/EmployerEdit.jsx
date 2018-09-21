import React, { Component } from 'react';
import axios from 'axios';

export default class EmployerEdit extends Component {

    constructor(props){
        super(props);
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
    }

    componentWillMount() {
        axios
            .get('/api/employees/edit/'+this.props.match.params.id,{
                headers: {'Authorization': 'Bearer ' + this.props.token},
            })
            .then(response => {
                this.setState({
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    company: response.data.company,
                    email: response.data.email,
                    phone: response.data.phone
                });
            })
            .catch(error => console.log(error))
    }

    handleOnChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    handleOnSubmit(e) {
        e.preventDefault();
        let employer_information = this.state;
        const { firstname, lastname, company,email,phone } = this.state;
        if (firstname == '' || lastname == '' || company == '' || email == '' || phone == ''){
            this.setState({
                message:'You have fields',
                messageType:'alert alert-danger'
            });
        }
        else {
            const id = this.props.match.params.id;
            this.props.handleEmployerUpdate(id,employer_information);
            this.setState({
                message:'Employer is updated',
                messageType:'alert alert-success'
            });
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
