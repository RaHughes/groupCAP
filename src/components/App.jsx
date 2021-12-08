import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import LogInForm from './LogInForm/LogInForm';
import NavBar from './NavBar/NavBar';
import SellPage from './SellPage/SellPage';
import VideoGameForm from './VideoGameForm/VideoGameForm';
import VideoGameList from './VideoGameList/VideoGameList';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import VideoGameDetail from './VideoGameDetail/VideoGameDetail';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoGames: [],
      user: ''
    };
  }

  componentDidMount() {
    this.getVideoGames();
    const jwt = localStorage.getItem('token');
    try {
      this.getUser(jwt);
    } catch {
      console.log('Something went wrong');
    }
  }

  editGame = async(game) => {
    await axios({
      method: "PUT",
      url: `https://localhost:44394/api/videogames/${game.id}`,
      data: {
        game
      }
    })
  }

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

  getVideoGameDetail = (vg) => {
      console.log(vg)
      this.setState({
          videoGame: vg
      })
  }

  addItemToShoppingCart = async() => {
      await axios({
        method: "POST",
        url: "https://localhost:44394/api/shoppingcart",
        data: {
          "userId": `${this.state.user.id}`,
          "productId": parseInt(`${this.state.videoGame.id}`),
          "quantity": 1
        }
      });
    }

    render(){
      let userId = this.state.userId
        return <div className="App">
            <NavBar user={this.state.user} logout={this.logout} />
            <Routes>
                <Route path="/" exact element={<VideoGameList videoGames={this.state.videoGames} getVg={this.getVideoGameDetail} />} />
                <Route path="/Login" element={<LogInForm />} />
                <Route path='/Sell' element={<SellPage user={this.state.user} videoGames={this.state.videoGames} editGame={this.editGame}/>} />
                <Route path="/Detail" element={<VideoGameDetail buyVideoGame = {this.addItemToShoppingCart} videoGame={this.state.videoGame} />} />
            </Routes>
        </div>
    }
  }

export default App;
