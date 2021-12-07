import React, { Component } from 'react'; 
import { Route, Routes } from 'react-router-dom';
import LogInForm from './LogInForm/LogInForm';
import NavBar from './NavBar/NavBar';
import VideoGameForm from './VideoGameForm/VideoGameForm';
import VideoGameList from './VideoGameList/VideoGameList';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

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