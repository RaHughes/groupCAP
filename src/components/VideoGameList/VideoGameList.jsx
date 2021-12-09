import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class VideoGameList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          videoGames: this.props.videoGames,
          search: '',
          flag: false
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let filteredGames = this.props.videoGames.filter(vg => vg.title.includes(this.state.search))
        this.setState({
            videoGames: filteredGames,
            flag: true
        })
    }
 
    render() {
        return ( <div>
            <form onSubmit={this.handleSubmit}>
            <label>Search: </label>
            <input name='search' onChange={this.handleChange}></input>
            <button type="submit">Search</button>
            </form>
            {this.state.flag === false ?
            this.props.videoGames.map(vg => {
                return <div key={Math.random()}>
                    <h1>{vg.title}</h1>
                    <h3>{vg.description}</h3>
                    <h4>{vg.system}</h4>
                    <h4>{vg.price}</h4>
                    <Link to='/Detail' onClick={ () => this.props.getVg(vg)} >View Product</Link>
                </div>}) 
                : 
            this.state.videoGames.map(vg => {
                return <div key={Math.random()}>
                    <h1>{vg.title}</h1>
                    <h3>{vg.description}</h3>
                    <h4>{vg.system}</h4>
                    <h4>{vg.price}</h4>
                    <Link to='/Detail' onClick={ () => this.props.getVg(vg)} >View Product</Link>
                </div>})} 
        </div>);
    }
}
 
export default VideoGameList
