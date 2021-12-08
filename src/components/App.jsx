import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import LogInForm from './LogInForm/LogInForm';
import NavBar from './NavBar/NavBar';
import SellPage from './SellPage/SellPage';
import VideoGameForm from './VideoGameForm/VideoGameForm';
import VideoGameList from './VideoGameList/VideoGameList';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoGames: [],
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

  render() {
    return (
      <div className='App'>
        <NavBar user={this.state.user} logout={this.logout} />
        <Routes>
          <Route
            path='/'
            exact
            element={<VideoGameList videoGames={this.state.videoGames} />}
          />
          <Route path='/Login' element={<LogInForm />} />
          <Route
            path='/Sell'
            element={
              <SellPage
                user={this.state.user}
                Games={this.state.videoGames.filter(
                  vg => vg.user == this.state.user
                )}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}
export default App;
