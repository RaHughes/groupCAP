import React, {Component} from 'react';


class UserRegister extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            firstName: '',
            lastName: '',
            userName: '',
            password: '',
            email: '',
            phonenumber: ''
         }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let newUser = {
            firstname: this.state.firstName,
            lastname: this.state.lastName,
            username: this.state.userName,
            password: this.state.password,
            email: this.state.email,
            phonenumber: this.state.phonenumber
        }
        this.props.registerUser(newUser)
        window.location = '/Login'
    }

    render() { 
        return ( <form onSubmit={this.handleSubmit}>
            <label>First Name: </label>
            <input name="firstName" value={this.state.firstName} onChange={this.handleChange}/>
            <label>Last Name: </label>
            <input name="lastName" value={this.state.lastName} onChange={this.handleChange}/>
            <label>Username: </label>
            <input name="userName" value={this.state.userName} onChange={this.handleChange}/>
            <label>Password: </label>
            <input name="password" value={this.state.password} onChange={this.handleChange}/>
            <label>Email: </label>
            <input name="email" value={this.state.email} onChange={this.handleChange}/>
            <label>Phone Number: </label>
            <input name="phonenumber" value={this.state.phonenumber} onChange={this.handleChange}/>
            <button type='submit'> Register </button>
        </form> );
    }
}
 
export default UserRegister;