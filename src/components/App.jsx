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

    // componentDidMount(){
    //     const jwt = localStorage.getItem('token');
    //     try {
    //         const user = jwtDecode(jwt);
    //         this.setState({
    //             user
    //         })
    //     } catch {
    //         console.log('Something went wrong')
    //     }
    // }

    render(){
        return <div className="App">
            <NavBar />
            <Routes>
                <Route path="/" exact element={<VideoGameList />} />
                <Route path="/Login" element={<LogInForm />} />
                <Route path="/Sell" element={<VideoGameForm />} /> 
                
            </Routes>
        </div>
    }
}
export default App; 