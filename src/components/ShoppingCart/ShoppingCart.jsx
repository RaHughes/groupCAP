
import React, {Component} from 'react';
import Modal from 'react-modal';
import axios from 'axios';

class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userId: this.props.user.id,
            shoppingCarts: [],
            purchasedGames: []
         }
    }

    componentDidMount(){
        this.getShoppingCarts()
    }

    async getShoppingCarts() {
        let userId = this.state.userId
        console.log(userId)
        await axios({
            method: "GET",
            url: "https://localhost:44394/api/shoppingcart/",
            data: {}
        }).then(response => this.setState({shoppingCarts: response.data}));
        console.log("Completed");
    }

    async clearShoppingCart(usersCart) {
        console.log(usersCart);
        for(let i = 0; i < usersCart.length; i++) {
            this.setState({
                purchasedGames: [...this.state.purchasedGames, usersCart[i].videoGame]
            })
            console.log(this.state.purchasedGames)
            await axios({
                method: "DELETE",
                url: `https://localhost:44394/api/shoppingcart/${usersCart[i].id}`,
            }).then(response => console.log(`${response.data.videoGame.title} was deleted from ${response.data.user.firstName}'s Cart!`));
        };
        this.props.purchaseGames(this.state.purchasedGames);
    };

    render() { 
        let filteredCarts = this.state.shoppingCarts.filter(sc => sc.userId === this.state.userId);
        return (
            <div>
                {filteredCarts.map(sc => {return(
                    <div key={sc.id}>
                        <h1>{sc.videoGame.title}</h1>
                        <h3>{sc.videoGame.category}</h3>
                        <h3>{sc.videoGame.description}</h3>
                        <h3>{sc.videoGame.price}</h3>
                        <h5>Sold By: {sc.videoGame.user.firstName} {sc.videoGame.user.lastName}</h5>
                    </div>
                        )})}
                {filteredCarts.length > 0 && 
                    <button onClick={() => this.clearShoppingCart(filteredCarts)} >Checkout</button>
                }
                {filteredCarts.length === 0 &&
                    <h1>You have no Items in your shopping cart!</h1>
                }
            </div> 
        );
    }
}
 
export default ShoppingCart;