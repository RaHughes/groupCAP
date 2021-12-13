import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.user.id,
      shoppingCarts: [],
      purchasedGames: [],
    };
  }

  componentDidMount() {
    this.getShoppingCarts();
  }

  async getShoppingCarts() {
    let userId = this.state.userId;
    console.log(userId);
    await axios({
      method: 'GET',
      url: 'https://localhost:44394/api/shoppingcart/',
      data: {},
    }).then(response => this.setState({ shoppingCarts: response.data }));
    console.log('Completed');
  }

  async clearShoppingCart(usersCart) {
    for (let i = 0; i < usersCart.length; i++) {
      this.setState({
        purchasedGames: [...this.state.purchasedGames, usersCart[i].videoGame],
      });
      console.log(usersCart[i]);
      await axios({
        method: 'DELETE',
        url: `https://localhost:44394/api/shoppingcart/${usersCart[i].id}`,
      }).then(response =>
        console.log(
          `${response.data.videoGame.title} was deleted from ${response.data.user.firstName}'s Cart!`
        )
      );
    }
    this.props.purchaseGames(this.state.purchasedGames);
    this.getShoppingCarts();
  }

  render() {
    let filteredCarts = this.state.shoppingCarts.filter(
      sc => sc.userId === this.state.userId
    );
    return (
      <div>
        {filteredCarts.map(sc => {
          return (
            <div key={sc.id}>
              <Card style={{ width: '22rem' }}>
                {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> This is left for introduction to an image.    */}
                <Card.Header>Product</Card.Header>
                <Card.Body>
                  <Card.Title>{sc.videoGame.title}</Card.Title>
                  <Card.Text>Description: {sc.videoGame.description}</Card.Text>
                </Card.Body>
                <ListGroup className='list-group-flush'>
                  <ListGroupItem>
                    Category: {sc.videoGame.category}
                  </ListGroupItem>
                  <ListGroupItem>Price: {sc.videoGame.price}</ListGroupItem>
                </ListGroup>
              </Card>
              <br />
              <br />
            </div>
          );
        })}
        {filteredCarts.length > 0 && (
          <button
            class='btn btn-secondary'
            onClick={() => this.clearShoppingCart(filteredCarts)}
          >
            Checkout
          </button>
        )}
        {filteredCarts.length === 0 && (
          <h1>You have no Items in your shopping cart!</h1>
        )}
      </div>
    );
  }
}

export default ShoppingCart;
