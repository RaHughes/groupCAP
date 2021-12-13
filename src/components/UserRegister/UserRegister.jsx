import React, { Component } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

class UserRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
      email: '',
      phonenumber: '',
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let newUser = {
      firstname: this.state.firstName,
      lastname: this.state.lastName,
      username: this.state.userName,
      password: this.state.password,
      email: this.state.email,
      phonenumber: this.state.phonenumber,
    };
    console.log(newUser);
    this.props.registerUser(newUser);
    // window.location = '/Login';
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit} className='register-form'>
          <Row className='mb-3 mt-3'>
            <Form.Group as={Col} controlId='formGridFirstName'>
              <Form.Label>First Name: </Form.Label>
              <Form.Control
                name='firstName'
                placeholder='First Name'
                value={this.state.firstName}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId='formGridLastName'>
              <Form.Label>Last Name: </Form.Label>
              <Form.Control
                name='lastName'
                placeholder='Last Name'
                value={this.state.lastName}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridUsername'>
              <Form.Label>Username: </Form.Label>
              <Form.Control
                name='userName'
                placeholder='User Name'
                value={this.state.userName}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId='formGridPassword'>
              <Form.Label>Password: </Form.Label>
              <Form.Control
                name='password'
                placeholder='Password'
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridEmail'>
              <Form.Label>Email: </Form.Label>
              <Form.Control
                name='email'
                placeholder='email@address.com'
                value={this.state.email}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId='formGridTel'>
              <Form.Label>Phone Number: </Form.Label>
              <Form.Control
                name='phonenumber'
                placeholder='111-222-3333'
                value={this.state.phonenumber}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Row>
          <Button type='submit' className='register-button'>
            {' '}
            Register{' '}
          </Button>
        </Form>
      </Container>
    );
  }
}

export default UserRegister;
