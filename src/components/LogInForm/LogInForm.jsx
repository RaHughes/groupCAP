import React, { Component } from 'react';
import axios from 'axios';

class LogInForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: '',
            password: ''
         }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: "https://localhost:44394/api/authentication/login",
            headers: {}, 
            data: {
              "username": this.state.username,
              "password": this.state.password
            }
          }).then(response => this.props.setToken(response.data.token));
          
    }

    render() { 
        return ( <form onSubmit={this.onSubmit}>
            <label> Username: </label>
            <input name="username" value={this.state.username} onChange={this.handleChange}></input>
            <label> Password: </label>
            <input name="password" value={this.state.password} onChange={this.handleChange}></input>
            <button type='submit'>Login</button>
        </form> );
    }
}
 
export default LogInForm;