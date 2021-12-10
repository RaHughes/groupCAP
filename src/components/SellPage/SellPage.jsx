import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import VideoGameForm from '../VideoGameForm/VideoGameForm';

class SellPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {
        id: '',
        title: '',
        price: 0,
        category: '',
        system: '',
        description: '',
        rating: 0,
      },
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

  handleEditSubmit = vg => {
    let game = {
      id: this.state.game.id,
      title: vg.title,
      price: vg.price,
      category: vg.category,
      system: vg.system,
      description: vg.description,
      rating: this.state.game.rating,
      userId: this.state.userId,
    };
    console.log(game);
    this.handleCloseModal();
    this.props.editGame(game);
  };

  handleAddSubmit = vg => {
    let game = {
      title: vg.title,
      price: vg.price,
      category: vg.category,
      system: vg.system,
      description: vg.description,
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

  handleEditClick = vg => {
    let selectedGame = { ...this.state.game };
    selectedGame.id = vg.id;
    selectedGame.title = vg.title;
    selectedGame.description = vg.description;
    selectedGame.system = vg.system;
    selectedGame.price = vg.price;
    selectedGame.category = vg.category;
    selectedGame.rating = vg.rating;
    this.setState(
      { game: selectedGame },
      console.log(this.state.game),
      this.handleOpenModal(vg.title)
    );
  };

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
              <button onClick={() => this.handleEditClick(vg)}>Edit</button>
              <Modal
                show={
                  this.state.modalIsOpen && this.state.activeModal === vg.title
                }
                onHide={this.handleCloseModal}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Edit Details for {vg.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {this.state.activeModal === vg.title && (
                    <VideoGameForm
                      game={this.state.game}
                      submit={this.handleEditSubmit}
                    />
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant='secondary' onClick={this.handleCloseModal}>
                    Cancel
                  </Button>
                </Modal.Footer>
              </Modal>
              <button onClick={() => this.handleDelete(vg.id)}>Delete</button>
            </div>
          );
        })}
        {this.state.userId === undefined ? (
          <h4>You must be logged in to Sell</h4>
        ) : (
          <button
            onClick={() =>
              this.setState(
                {
                  id: '',
                  title: '',
                  description: '',
                  system: '',
                  price: 0,
                  category: '',
                  rating: 0,
                },
                this.handleOpenModal('addNewSong')
              )
            }
          >
            Add
          </button>
        )}
        <Modal
          show={
            this.state.modalIsOpen && this.state.activeModal === 'addNewSong'
          }
          onHide={this.handleCloseModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Sell a Game</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.activeModal === 'addNewSong' && (
              <VideoGameForm
                game={this.state.game}
                submit={this.handleAddSubmit}
              />
            )}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default SellPage;
