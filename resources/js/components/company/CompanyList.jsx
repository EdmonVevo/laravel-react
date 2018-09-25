import React, {Component} from 'react';
import {HashRouter as Router, Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from "react-js-pagination";

export default class CompanyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companies_data: [],
            activePage:1,
            itemsCountPerPage:1,
            totalItemsCount:1,
            pageRangeDisplayed:3
        }
        this.handlePageChange = this.handlePageChange.bind(this);

    };

    componentDidMount() {
        axios
            .get('/api/companies',{
                headers: {Authorization: 'Bearer ' + this.props.token},
            })
            .then(response => {
                this.setState({
                    companies_data: response.data.data,
                    itemsCountPerPage:response.data.per_page,
                    totalItemsCount:response.data.total,
                    activePage:response.data.current_page
                });

            })
            .catch(error => console.log(error))
    }

    handleDelete(id) {
        axios
            .delete('/api/companies/' + id,{
                headers: {Authorization: 'Bearer ' + this.props.token},
            })
            .then(response => {

                let newCompaniesData = this.state.companies_data.filter((item) => {
                    return item.id !== id;
                });
                this.setState({
                    companies_data: newCompaniesData,
                })

            })
            .catch(error => console.log(error))
    }


    handlePageChange(pageNumber) {
        axios
            .get('/api/companies?page='+pageNumber,{
                headers: {Authorization: 'Bearer ' + this.props.token},
            })
            .then(response => {
                this.setState({
                    companies_data: response.data.data,
                    itemsCountPerPage:response.data.per_page,
                    totalItemsCount:response.data.total,
                    activePage:response.data.current_page
                });
            })
            .catch(error => console.log(error))
    }

    renderItems() {
        if (!this.state.companies_data.length) {
            return (
                <tr>

                </tr>
            )
        }

        return this.state.companies_data.map(company => {
            return (
                <tr key={company.id}>
                    <td>{company.name}</td>
                    <td>{company.email}</td>
                    <td>{company.website}</td>
                    <td><img className="company_logo" src=
                             {company.logo !== null ? `images/${company.logo}` : 'https://images.fineartamerica.com/images-medium-large-5/bean-digital-portrait-paul-tagliamonte.jpg'}

                             alt=""/></td>
                    <td>{company.created_at}</td>
                    <td>
                        <Link className="btn btn-warning" to={`/companies/${company.id}`}>Edit</Link>
                    </td>
                    <td>
                        <button className="btn btn-danger" onClick={() => this.handleDelete(company.id)}>
                            Delete
                        </button>
                    </td>
                </tr>
            )
        })

    };

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Website</th>
                        <th scope="col">Logo</th>
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