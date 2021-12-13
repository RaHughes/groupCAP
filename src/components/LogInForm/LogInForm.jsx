import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = async event => {
    event.preventDefault();
    await axios({
      method: 'post',
      url: 'https://localhost:44394/api/authentication/login',
      headers: {},
      data: {
        username: this.state.username,
        password: this.state.password,
      },
    }).then(response => localStorage.setItem('token', response.data.token));
    window.location = '/';
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.onSubmit}>
          <Form.Label> Username: </Form.Label>
          <Form.Control
            name='username'
            value={this.state.username}
            onChange={this.handleChange}
          ></Form.Control>
          <Form.Label> Password: </Form.Label>
          <Form.Control
            name='password'
            value={this.state.password}
            onChange={this.handleChange}
          ></Form.Control>
          <Button type='submit'>Login</Button>
        </Form>
      </Container>
    );
  }
}

export default LogInForm;
