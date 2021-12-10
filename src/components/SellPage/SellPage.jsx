import React, { Component } from 'react';
import Modal from 'react-bootstrap';

class SellPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      price: 0,
      category: '',
      system: '',
      description: '',
      rating: 0,
      userId: this.props.user.id,
      modalIsOpen: false,
      activeModal: '',
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleEditSubmit = event => {
    event.preventDefault();
    let game = {
      id: this.state.id,
      title: this.state.title,
      price: this.state.price,
      category: this.state.category,
      system: this.state.system,
      description: this.state.description,
      rating: this.state.rating,
      userId: this.state.userId,
    };
    console.log(game);
    this.handleCloseModal();
    this.props.editGame(game);
  };

  handleAddSubmit = event => {
    event.preventDefault();
    let game = {
      id: this.state.id,
      title: this.state.title,
      price: this.state.price,
      category: this.state.category,
      system: this.state.system,
      description: this.state.description,
      rating: this.state.rating,
      userId: this.state.userId,
    };
    console.log(game);
    this.handleCloseModal();
    this.props.addGame(game);
  };

  handleDelete = gameId => this.props.deleteGame(gameId);

  handleOpenModal = value =>
    this.setState({
      activeModal: value,
      modalIsOpen: true,
    });

  handleCloseModal = () =>
    this.setState({ activeModal: '', modalIsOpen: false });

  render() {
    let filteredList = this.props.videoGames.filter(
      vg => vg.userId === this.state.userId
    );
    return (
      <div>
        {filteredList.map(vg => {
          return (
            <div key={vg.id}>
              <h1>{vg.title}</h1>
              <h3>{vg.description}</h3>
              <h4>{vg.category}</h4>
              <h4>{vg.system}</h4>
              <h4>{vg.price}</h4>
              {/* <Link>Details</Link> */}
              <button
                onClick={() => (
                  this.setState({
                    id: vg.id,
                    title: vg.title,
                    description: vg.description,
                    system: vg.system,
                    price: vg.price,
                    category: vg.category,
                    rating: vg.rating,
                  }),
                  this.handleOpenModal(vg.title)
                )}
              >
                Edit
              </button>
              <Modal
                show={
                  this.state.modalIsOpen && this.state.activeModal === vg.title
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
                <form onSubmit={this.handleEditSubmit}>
                  <label htmlFor=''>Title</label>
                  <input
                    type='text'
                    name='title'
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                  <label htmlFor=''>Description</label>
                  <input
                    type='text'
                    name='description'
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
                  <label htmlFor=''>Category</label>
                  <input
                    type='text'
                    name='category'
                    value={this.state.category}
                    onChange={this.handleChange}
                  />
                  <label htmlFor=''>System</label>
                  <input
                    type='text'
                    name='system'
                    value={this.state.system}
                    onChange={this.handleChange}
                  />
                  <label htmlFor=''>Price</label>
                  <input
                    type='number'
                    name='price'
                    value={this.state.price}
                    onChange={this.handleChange}
                  />
                  <button type='submit'>Submit</button>
                </form>
              </Modal>
              <button onClick={() => this.handleDelete(vg.id)}>Delete</button>
            </div>
          );
        })}
        <button
          onClick={() => (
            this.setState({
              id: '',
              title: '',
              description: '',
              system: '',
              price: 0,
              category: '',
              rating: 0,
            }),
            this.handleOpenModal('addNewSong')
          )}
        >
          {' '}
          Add{' '}
        </button>
        <Modal
          isOpen={
            this.state.modalIsOpen && this.state.activeModal === 'addNewSong'
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
          <form onSubmit={this.handleAddSubmit}>
            <label htmlFor=''>Title</label>
            <input
              type='text'
              name='title'
              value={this.state.title}
              onChange={this.handleChange}
            />
            <label htmlFor=''>Description</label>
            <input
              type='text'
              name='description'
              value={this.state.description}
              onChange={this.handleChange}
            />
            <label htmlFor=''>Category</label>
            <input
              type='text'
              name='category'
              value={this.state.category}
              onChange={this.handleChange}
            />
            <label htmlFor=''>System</label>
            <input
              type='text'
              name='system'
              value={this.state.system}
              onChange={this.handleChange}
            />
            <label htmlFor=''>Price</label>
            <input
              type='number'
              name='price'
              value={this.state.price}
              onChange={this.handleChange}
            />
            <button type='submit'>Submit</button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default SellPage;
