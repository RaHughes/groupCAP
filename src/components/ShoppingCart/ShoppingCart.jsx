import axios from 'axios';
import React, {Component} from 'react';
import Modal from 'react-modal';

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
        let userId = `${this.state.userId}`
        console.log(userId)
        let response = await axios({
            method: "GET",
            url: "https://localhost:44394/api/shoppingcart/all",
            data: {
                userId: userId
            }
        })
        this.setState({
            shoppingCarts: response.data
        })
    }

    render() { 
        return ( <div>

        </div> );
    }
}
 
export default ShoppingCart;