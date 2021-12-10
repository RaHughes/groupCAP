import React, { Component } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

class ReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      videoGames: this.props.videoGamesPurchased,
      review: '',
      rating: 0,
      showModal: false,
      activeModal: '',
      videoGameId: 0,
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSelect = event => {
    this.setState({
      rating: event.target.value,
    });
  };

  async handleSubmit(event) {
    await axios({
      method: 'POST',
      url: 'https://localhost:44394/api/reviews',
      data: {
        userId: this.state.userId,
        videoGameId: parseInt(this.state.videoGameId),
        rating: parseInt(this.state.rating),
        reviewChar: this.state.review,
      },
    });
    console.log('Review Created!');
    this.handleCloseModal(event);
    this.clearSingleReview(this.state.videoGameId);
    this.props.helper();
  }

  clearSingleReview(videoGameId) {
    let filteredArr = this.state.videoGames.filter(vg => vg.id !== videoGameId);
    this.setState({
      videoGames: filteredArr,
    });
  }

  handleOpenModal = (value, id) =>
    this.setState({
      activeModal: value,
      showModal: true,
      videoGameId: id,
    });

  handleCloseModal = event => {
    this.setState({ activeModal: '', showModal: false });
  };

  render() {
    return (
      <div>
        <h3>Please Leave a Review</h3>
        <br />
        {this.state.videoGames.map(vg => {
          return (
            <>
              <h1>{vg.title}</h1>
              <button onClick={() => this.handleOpenModal(vg.title, vg.id)}>
                Review
              </button>
              <Modal
                show={
                  this.state.showModal && this.state.activeModal === vg.title
                }
              >
                <div>
                  <h4>Title: {vg.title}</h4>
                  <label>Rating: </label>
                  <select
                    name='rating'
                    value={this.state.rating}
                    onChange={this.handleSelect}
                  >
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                  </select>
                  <label>Review: </label>
                  <input
                    type='text'
                    name='review'
                    // value={this.state.review}
                    onChange={this.handleChange}
                  ></input>
                  <button onClick={() => this.handleSubmit()}>Submit</button>
                </div>
              </Modal>
            </>
          );
        })}
      </div>
    );
  }
}

export default ReviewForm;
