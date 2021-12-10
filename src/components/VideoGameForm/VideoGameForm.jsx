import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

class VideoGameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.game.title,
      price: this.props.game.price,
      category: this.props.game.category,
      system: this.props.game.system,
      description: this.props.game.description,
    };
  }

  componentDidMount() {
    console.log(this.state);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const game = {
      title: this.state.title,
      description: this.state.description,
      price: this.state.price,
      category: this.state.category,
      system: this.state.system,
    };
    console.log(game);
    this.props.submit(game);
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor=''>Title</Form.Label>
          <Form.Control
            type='text'
            name='title'
            value={this.state.title}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor=''>Description</Form.Label>
          <Form.Control
            type='text'
            name='description'
            value={this.state.description}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor=''>Category</Form.Label>
          <Form.Control
            type='text'
            name='category'
            value={this.state.category}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor=''>System</Form.Label>
          <Form.Control
            type='text'
            name='system'
            value={this.state.system}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor=''>Price</Form.Label>
          <Form.Control
            type='number'
            name='price'
            value={this.state.price}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    );
  }
}

export default VideoGameForm;
