import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

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
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSelect = event => {
    event.preventDefault();
    this.setState({
      rating: event.target.value,
    });
  };

  handleSubmit = (event, id) => {
    event.preventDefault();
    console.log(id);
    axios({
      method: 'POST',
      url: 'https://localhost:44394/api/reviews',
      data: {
        userId: this.state.userId,
        videoGameId: parseInt(id),
        rating: parseInt(this.state.rating),
        reviewChar: this.state.review,
      },
    });
    console.log('Review Created!');
    this.handleCloseModal();
  };

  handleOpenModal = value =>
    this.setState({
      activeModal: value,
      showModal: true,
    });

  handleCloseModal = () => this.setState({ activeModal: '', showModal: false });

  render() {
    return (
      <div>
        <h3>Please Leave a Review</h3>
        <br />
        {this.state.videoGames.map(vg => {
          return (
            <>
              <h1>{vg.title}</h1>
              <button onClick={() => this.handleOpenModal(vg.title)}>
                Review
              </button>
              <Modal
                isOpen={
                  this.state.showModal && this.state.activeModal === vg.title
                }
                style={{
                  overlay: {
                    position: 'fixed',
                    height: '30vh',
                    width: '40%',
                    top: 0,
                    left: '50vw',
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.75)',
                  },
                  content: {
                    position: 'absolute',
                    top: '40px',
                    left: '40px',
                    right: '40px',
                    bottom: '40px',
                    border: '1px solid #ccc',
                    background: '#fff',
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '4px',
                    outline: 'none',
                    padding: '20px',
                  },
                }}
              >
                <form
                  onSubmit={() => this.handleSubmit(vg.id)}
                  key={Math.random()}
                >
                  <h4>Title: {vg.title}</h4>
                  <label>Rating: </label>
                  <select name='rating' onChange={this.handleSelect}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                  </select>
                  <label>Review: </label>
                  <input
                    name='review'
                    value={this.state.review}
                    onChange={this.handleChange}
                  ></input>
                  <button type='submit'>Submit</button>
                </form>
              </Modal>
            </>
          );
        })}
      </div>
    );
  }
}

export default ReviewForm;
