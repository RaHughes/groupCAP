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
          return(<div key={vg.id}>
            <h1>{vg.title}</h1>
            <h3>{vg.description}</h3>
            <h4>{vg.system}</h4>
            <h4>{vg.price}</h4>
<<<<<<< HEAD
          </div>;
=======
            {/* <Link>Details</Link> */}
            <button
              onclick={() =>
                this.setState({
                  game: {
                    id: vg.id,
                    title: vg.title,
                    description: vg.description,
                    system: vg.system,
                    price: vg.price,
                    rating: vg.rating,
                  },
                  modalIsOpen: true,
                })
              }
            >
              Edit
            </button>
            <Modal isOpen={this.state.modalIsOpen}>
              <form onSubmit={this.handleEditSubmit}>
                <label htmlFor=''>Title</label>
                <input
                  type='text'
                  name='game.title'
                  value={this.state.game.title}
                  onChange={this.handleChange}
                />
                <label htmlFor=''>Description</label>
                <input
                  type='text'
                  name='game.description'
                  value={this.state.game.description}
                  onChange={this.handleChange}
                />
                <label htmlFor=''>System</label>
                <input
                  type='text'
                  name='game.system'
                  value={this.state.game.system}
                  onChange={this.handleChange}
                />
                <label htmlFor=''>Price</label>
                <input
                  type='number'
                  name='game.price'
                  value={this.state.game.price}
                  onChange={this.handleChange}
                />
                <button type='submit'>Submit</button>
              </form>
            </Modal>
            {/* <Link>Delete</Link> */}
          </div>)
>>>>>>> fab247e7d4ed8371492ff76cd751d1f3868e707b
        })}
      </div>
    );
  }
}

export default SellPage;
