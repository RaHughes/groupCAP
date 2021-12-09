
import React, {Component} from 'react';
import Modal from 'react-modal';
import axios from 'axios';

class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userId: this.props.user.id,
            shoppingCarts: []
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
                        <h5>Sold By: {sc.user.firstName} {sc.user.lastName}</h5>
                    </div>
                        )})}
            </div> 
        );
    }
}
 
export default ShoppingCart;