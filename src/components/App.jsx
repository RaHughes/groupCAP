import React, { Component } from 'react'; 
import { Route, Routes } from 'react-router-dom';
import LogInForm from './LogInForm/LogInForm';
import NavBar from './NavBar/NavBar';
import VideoGameForm from './VideoGameForm/VideoGameForm';
import VideoGameList from './VideoGameList/VideoGameList';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        const jwt = localStorage.getItem('token');
        try {
            const user = jwtDecode(jwt);
            this.setState({
                user
            })
        } catch {
            console.log('Something went wrong')
        }
    }

    async componentDidUpdate() {
        localStorage.setItem('token', this.state.token);
        try {
            const user = jwtDecode(this.state.token);
            // const user2 =  await axios({
            //      method: 'GET',
            //      url: "https://localhost:44394/api/authentication/login",
            //      headers: {"Authorization": `Bearer ${this.state.token}`}})
            this.setState({
                user
            })
            console.log(user)
        } catch {
            console.log('Something went wrong')
        }
      } 

    setToken = (token) => {
        this.setState({token: token});
    }

    logout = () => {
        localStorage.removeItem('token')
        this.setState({
            token: '',
            user: ''
        })
    }

    render(){
        return <div className="App">
            <NavBar user={this.state.user} logout={this.logout} />
            <Routes>
                <Route path="/" exact element={<VideoGameList />} />
                <Route path="/Login" element={<LogInForm setToken={this.setToken} />} />
                <Route path="/Sell" element={<VideoGameForm />} /> 
                
            </Routes>
        </div>
    }
}
export default App; 