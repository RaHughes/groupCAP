import React, { Component } from 'react';
import {
  Modal,
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
} from 'react-bootstrap';
import VideoGameForm from '../VideoGameForm/VideoGameForm';
import './SellPage.css';

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
      rating: this.state.game.rating,
      userId: this.state.userId,
    };
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
    this.setState({ game: selectedGame }, this.handleOpenModal(vg.title));
  };

  render() {
    let filteredList = this.props.videoGames.filter(
      vg => vg.userId === this.state.userId
    );
    return (
      <Container fluid className='justify-content-center'>
        {this.state.userId === undefined ? (
          <h4>You must be logged in to Sell</h4>
        ) : (
          <Row className='justify-content-center sm-4'>
            <Col className='justify-content-center sm-4 add-button-col'>
              <Button
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
                className='add-button'
              >
                List a New Game for Sale
              </Button>
            </Col>
          </Row>
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
        <Row className='justify-content-center d-flex flex-wrap align-items-center videogame-cards'>
          {filteredList.map(vg => (
            <Col>
              <Card className='text-centered videogame-card'>
                <Card.Body className='overflow'>
                  <Card.Title>{vg.title}</Card.Title>
                  <Card.Subtitle>Price: ${vg.price}</Card.Subtitle>
                  <Card.Text className='text-muted'>
                    Category: {vg.category}
                    <br />
                    System: {vg.system}
                  </Card.Text>
                  <Card.Text>{vg.description}</Card.Text>
                </Card.Body>
                <Card.Body>
                  <Button onClick={() => this.handleEditClick(vg)}>Edit</Button>{' '}
                  <Modal
                    show={
                      this.state.modalIsOpen &&
                      this.state.activeModal === vg.title
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
                  </Modal>
                  <Button onClick={() => this.handleDelete(vg.id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default SellPage;
