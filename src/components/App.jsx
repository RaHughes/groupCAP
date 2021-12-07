import React, { Component } from 'react'; 
import { Route, Routes } from 'react-router-dom';
import LogInForm from './LogInForm/LogInForm';
import NavBar from './NavBar/NavBar';
import VideoGameForm from './VideoGameForm/VideoGameForm';
import VideoGameList from './VideoGameList/VideoGameList';
import jwtDecode from 'jwt-decode';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
        localStorage.setItem('token', this.state.token);
        try {
            const user = jwtDecode(this.state.token);
            this.setState({
                user
            })
        } catch {
            console.log('Something went wrong')
        }
    }

    setToken = (token) => {
        this.setState({token: token});
    }

    render(){
        return <div className="App">
            <NavBar user={this.state.user} />
            <Routes>
                <Route path="/" exact element={<VideoGameList />} />
                <Route path="/Login" element={<LogInForm setToken={this.setToken} />} />
                <Route path="/Sell" element={<VideoGameForm />} /> 
                
            </Routes>
        </div>
    }
}
export default App; 