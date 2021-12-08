import React, {Component} from 'react';
import axios from 'axios';

class VideoGameList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            videoGames: []
         }
    }

    componentDidMount(){
        this.getVideoGames()
    }

    getVideoGames = async() => {
        var response = await axios.get("https://localhost:44394/api/videogames")
        this.setState({
            videoGames: response.data
        })
    }

    render() { 
        return ( <div>
            {this.state.videoGames.map(vg => {
                return <div key={Math.random()}>
                    <h1>{vg.title}</h1>
                    <h3>{vg.description}</h3>
                    <h4>{vg.system}</h4>
                    <h4>{vg.price}</h4>
                </div>
            })}
        </div> );
    }
}
 
export default VideoGameList;
