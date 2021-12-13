import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import './ShoppingCart.css';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.user.id,
      shoppingCarts: [],
      purchasedGames: [],
      cartTotal: 0,
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
    let cartTotal = 0;
    let cartSum = filteredCarts.map(sc => {
      cartTotal += sc.videoGame.price;
    });
    let moreCarts = [];
    filteredCarts.forEach(cart => {
      let found = moreCarts.find(
        element => element.productId === cart.productId
      );
      if (found) {
        moreCarts[moreCarts.indexOf(found)].quantity++;
      } else {
        moreCarts.push(cart);
      }
    });
    return (
      <div className='cartObject'>
        <table id='shoppingCart' className='cartTable'>
          <tr className='cartTableHeader'>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
          {moreCarts.map(sc => {
            return (
              <tr className='cartItem'>
                <td>{sc.videoGame.title}</td>
                <td>{sc.videoGame.price}</td>
                <td>{sc.quantity}</td>
              </tr>
            );
          })}
        </table>

        {moreCarts.length > 0 && (
          <div className='checkoutForm'>
            <h4 className='cartTotal'>Total: ${cartTotal} </h4>
            <button
              className='cartButton btn btn-primary '
              onClick={() => this.clearShoppingCart(filteredCarts)}
            >
              Checkout
            </button>
          </div>
        )}

        {moreCarts.length === 0 && (
          <h1>You have no Items in your shopping cart!</h1>
        )}
      </div>
    );
  }
}

export default ShoppingCart;
