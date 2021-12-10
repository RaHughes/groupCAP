import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import LogInForm from './LogInForm/LogInForm';
import NavBar from './NavBar/NavBar';
import SellPage from './SellPage/SellPage';
import VideoGameList from './VideoGameList/VideoGameList';
import axios from 'axios';
import VideoGameDetail from './VideoGameDetail/VideoGameDetail';
import UserRegister from './UserRegister/UserRegister';
import ShoppingCart from './ShoppingCart/ShoppingCart';
import ReviewForm from './ReviewForm/ReviewForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoGames: [],
      user: '',
      purchasedVideoGames: [],
      reviews: []
    };
  }

  componentDidMount() {
    this.getVideoGames();
    this.getReviews();
    const jwt = localStorage.getItem('token');
    try {
      this.getUser(jwt);
    } catch {
      console.log('Something went wrong');
    }
  }

  async getReviews() {
    let response = await axios.get("https://localhost:44394/api/reviews");
    this.setState({
      reviews: response.data
    })
  }

  editGame = async game => {
    await axios({
      method: 'PUT',
      url: `https://localhost:44394/api/videogames/${game.id}`,
      data: {
        id: game.id,
        title: game.title,
        price: parseInt(game.price),
        category: game.category,
        system: game.system,
        description: game.description,
        rating: parseInt(game.rating),
        userId: game.userId,
      },
    });
    this.getVideoGames();
  };

  addGame = async game => {
    await axios({
      method: 'POST',
      url: "https://localhost:44394/api/videogames",
      data : {
        title: game.title,
        price: parseInt(game.price),
        category: game.category,
        system: game.system,
        description: game.description,
        rating: parseInt(game.rating),
        userId: game.userId
      }
    })
    this.getVideoGames();
  };

  deleteGame = async gameId => {
    await axios.delete(`https://localhost:44394/api/videogames/${gameId}`);
    this.getVideoGames();
  };

  async getUser(token) {
    let user = await axios({
      method: 'GET',
      url: 'https://localhost:44394/api/examples/user',
      headers: { Authorization: `Bearer ${token}` },
    });
    this.setState({
      user: user.data,
    });
  }

  logout = () => {
    localStorage.removeItem('token');
    this.setState({
      token: '',
      user: '',
    });
  };

  getVideoGames = async () => {
    var response = await axios.get('https://localhost:44394/api/videogames');
    this.setState({
      videoGames: response.data,
    });
  };

  getVideoGameDetail = vg => {
    console.log(vg);
    this.setState({
      videoGame: vg,
    });
  };

  addItemToShoppingCart = async () => {
    await axios({
      method: 'POST',
      url: 'https://localhost:44394/api/shoppingcart',
      data: {
        userId: `${this.state.user.id}`,
        productId: parseInt(`${this.state.videoGame.id}`),
        quantity: 1,
      },
    });
  };

  registerUser = async user => {
    await axios({
      method: 'POST',
      url: 'https://localhost:44394/api/authentication',
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        password: user.password,
        email: user.email,
        phonenumber: user.phonenumber,
      },
    });
    console.log(user);
  };

  getPurchasedGames = (arr) => {
    console.log(arr);
    this.setState({
      purchasedVideoGames: arr
    })
    
  }

  render() {
    return (
      <div className='App'>
        <NavBar user={this.state.user} logout={this.logout} />
        <Routes>
          <Route path='/' exact element={<VideoGameList videoGames={this.state.videoGames} getVg={this.getVideoGameDetail} />} />
          <Route path='/Login' element={<LogInForm />} />
          <Route
            path='/Register'
            element={<UserRegister registerUser={this.registerUser} />}
          />
          <Route
            path='/Sell'
            element={
              <SellPage
                user={this.state.user}
                videoGames={this.state.videoGames}
                editGame={this.editGame}
                deleteGame={this.deleteGame}
                addGame={this.addGame}
              />
            }
          />
          <Route
            path='/Detail'
            element={
              <VideoGameDetail
                buyVideoGame={this.addItemToShoppingCart}
                videoGame={this.state.videoGame}
                reviews = {this.state.reviews}
              />
            }
          />
          <Route
            path='/Cart'
            element={<ShoppingCart user={this.state.user} purchaseGames={this.getPurchasedGames} />}
          />
          <Route 
            path='/Review'
            element={<ReviewForm userId={this.state.user.id} videoGamesPurchased={this.state.purchasedVideoGames} />}
          />
        </Routes>
      </div>
    );
  }
}

export default App;
