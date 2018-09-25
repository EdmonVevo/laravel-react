import React, { Component } from 'react';
import {HashRouter as Router, Link} from 'react-router-dom';
import axios from 'axios';
import Pagination from "react-js-pagination";

export default class EmployerList extends Component {

    constructor() {
        super();
        this.state = {
            employees_data:[],
            activePage:1,
            itemsCountPerPage:1,
            totalItemsCount:1,
            pageRangeDisplayed:3
        };

        this.handlePageChange = this.handlePageChange.bind(this)
    }

    componentDidMount(){
        axios
            .get('api/employees',{
                headers: {Authorization: 'Bearer ' + this.props.token}
            })
            .then(response=> {
               this.setState({
                   employees_data:response.data.data,
                   itemsCountPerPage:response.data.per_page,
                   totalItemsCount:response.data.total,
                   activePage:response.data.current_page
               });
            })
            .catch(e=>{console.log(e)});
    };

    handleDelete(id){
        axios
            .delete('/api/employees/'+ id , {
                headers: {Authorization: 'Bearer ' + this.props.token},
            })
            .then(response=>{

                let newEmployerData = this.state.employees_data.filter((item)=> {
                    return item.id != id;
                });
                this.setState({
                    employees_data:newEmployerData,
                })
            })
            .catch(error=>console.log(error));
    }

    handlePageChange(pageNumber){
        axios
            .get('api/employees?page='+ pageNumber,{
                headers: {Authorization: 'Bearer ' + this.props.token},
            })
            .then(response=> {
                this.setState({
                    employees_data:response.data.data,
                    itemsCountPerPage:response.data.per_page,
                    totalItemsCount:response.data.total,
                    activePage:response.data.current_page

                });
            })
            .catch(e=>{console.log(e)});
    };

    renderItems() {
        if (!this.state.employees_data.length) {
            return (
                <tr>

                </tr>
            );
        }

        return this.state.employees_data.map(employer=>{
            return (
                <tr key={employer.id}>

                    <td>{employer.firstname}</td>
                    <td>{employer.lastname}</td>
                    <td>{employer.company}</td>
                    <td>{employer.email}</td>
                    <td>{employer.phone}</td>
                    <td>{employer.created_at}</td>
                    <td>
                        <Link className="btn btn-warning" to={`/employees/${employer.id}`}>Edit</Link>
                    </td>
                    <td>
                        <button className="btn btn-danger" onClick={() => this.handleDelete(employer.id)}>
                            Delete
                        </button>
                    </td>
                </tr>
            )
        })
    };


    render(){
        return(
            <div>
                <table className="table">
                    <thead>
                    <tr>

                        <th scope="col">Firstname</th>
                        <th scope="col">Lastname</th>
                        <th scope="col">Company</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Created at</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.renderItems()}
                    </tbody>
                </table>
                <div className="d-flex justify-content-center">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={this.state.pageRangeDisplayed}
                        onChange={this.handlePageChange}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>
            </div>
        )
    }
}