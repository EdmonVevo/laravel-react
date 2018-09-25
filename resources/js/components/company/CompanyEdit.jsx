import React, { Component } from 'react';
import axios from 'axios';

export default class CompanyEdit extends Component {

    constructor(props){
        super(props);
        this.state = {
            name:'',
            email:'',
            website:'',
            logo:'',
            message:'',
            messageType:''
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleFileOnChange = this.handleFileOnChange.bind(this);
        this.createImage = this.createImage.bind(this);

    }
    //
    componentWillMount() {
        axios
            .get('/api/companies/'+ this.props.match.params.id , {
                headers: {'Authorization': 'Bearer ' + this.props.token},
            })
            .then(response => {
                this.setState({
                    name: response.data.name,
                    email: response.data.email,
                    website: response.data.website
                });
            })
            .catch(error => console.log(error))
    }

    handleOnChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })

    }
    //
    handleOnSubmit(e) {
        e.preventDefault();
        let company_information = this.state;
        const { name, email, website,logo } = this.state;
        if (name == '' || email == '' || website == '' ){
            this.setState({
                message:'Empty fields',
                messageType:'alert alert-danger'
            });
        }
        else {
            const id = this.props.match.params.id;
            this.props.handleCompanyUpdate(id,company_information);
            this.setState({
                message:'Company is updated',
                messageType:'alert alert-success'
            });
        }
    };

    handleFileOnChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        this.createImage(files[0]);
    }

    createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({
                logo: e.target.result
            })
        };
        reader.readAsDataURL(file);
    }



    render(){
        return(
            <div>
                <form name='company_form' className="add_company" onSubmit={this.handleOnSubmit} encType="multipart/form-data">
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
                    <div className="form-group">
                        <label htmlFor="logo">Logo</label>
                        <input  type="file" name="logo" id="logo" className="form-control" onChange={this.handleFileOnChange}/>
                    </div>

                    <button type="submit" name="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}
