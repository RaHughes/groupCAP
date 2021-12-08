import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import EditGame from '../EditGame/EditGame';

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
        userId: this.props.user.id,
      },
      modalIsOpen: false,
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleEditSubmit = event => {
    this.preventDefault();
    this.props.editGame(this.state.game);
  };

  render() {
    return (
      <div>
        {this.props.videoGames.map(vg => {
          <div key={Math.random()}>
            <h1>{vg.title}</h1>
            <h3>{vg.description}</h3>
            <h4>{vg.system}</h4>
            <h4>{vg.price}</h4>
          </div>;
        })}
      </div>
    );
  }
}

export default SellPage;
