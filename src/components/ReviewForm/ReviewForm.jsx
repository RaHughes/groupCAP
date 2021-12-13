import React, { Component } from 'react';
import axios from 'axios';
import {
  Modal,
  Button,
  Form,
  ListGroup,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

class ReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      videoGames: this.props.videoGamesPurchased,
      review: '',
      rating: 1,
      showModal: false,
      activeModal: '',
      videoGameId: 0,
    };
  }

  handleChange = event => {
    this.setState({
      review: event.target.value,
    });
  };

  handleSelect = event => {
    this.setState({
      rating: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const data = {
      userId: this.state.userId,
      videoGameId: parseInt(this.state.videoGameId),
      rating: parseInt(this.state.rating),
      reviewChar: this.state.review,
    };
    console.log(data);
    this.props.addReview(data);
    this.handleCloseModal(event);
    this.clearSingleReview(this.state.videoGameId);
  };

  clearSingleReview(videoGameId) {
    let filteredArr = this.state.videoGames.filter(vg => vg.id !== videoGameId);
    this.setState(
      {
        videoGames: filteredArr,
      },
      console.log('review cleared')
    );
  }

  handleOpenModal = (value, id) => {
    this.setState(
      {
        activeModal: value,
        showModal: true,
        videoGameId: id,
      },
      console.log(this.state)
    );
  };

  handleCloseModal = event => {
    this.setState({ activeModal: '', showModal: false });
  };

  render() {
    return (
      <Container>
        <h3>Please Review Your Purchases</h3>

        <br />
        <ListGroup>
          {this.state.videoGames.map(vg => (
            <>
              <ListGroup.Item
                action
                onClick={() => this.handleOpenModal(vg.title, vg.id)}
                key={vg.id}
              >
                <h2>{vg.title}</h2> - <h4>{vg.system}</h4>
              </ListGroup.Item>
              <Modal
                show={
                  this.state.showModal && this.state.activeModal === vg.title
                }
                onHide={this.handleCloseModal}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Review: {vg.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Label>Rating</Form.Label>
                    <Form.Select
                      name='rating'
                      value={this.state.rating}
                      onChange={this.handleSelect}
                    >
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                      <option value='5'>5</option>
                    </Form.Select>
                    <Form.Label>Review:</Form.Label>
                    <Form.Control
                      type='text'
                      name='review'
                      // value={this.state.review}
                      onChange={this.handleChange}
                    ></Form.Control>
                    <Button type='submit' className='mt-3'>
                      Submit
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal>
            </>
          ))}
        </ListGroup>
      </Container>
    );
  }
}

export default ReviewForm;
