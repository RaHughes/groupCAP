import React, { Component } from 'react';

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

    render() { 
        return ( <div>
            <label> Username: </label>
            <input name="username" value={this.state.username} onChange={this.handleChange}></input>
            <label> Password: </label>
            <input name="password" value={this.state.password} onChange={this.handleChange}></input>
        </div> );
    }
}
 
export default LogInForm;