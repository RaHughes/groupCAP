import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './VideoGameList.css'


class VideoGameList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          videoGames: this.props.videoGames,
          search: '',
          flag: false,
          filterBy: 'title'
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSelect = (event) => {
        event.preventDefault()
        this.setState({
            filterBy: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let filteredGames = this.props.videoGames.filter(vg => vg[this.state.filterBy].includes(this.state.search))
        this.setState({
            videoGames: filteredGames,
            flag: true
        })
    }
 
    render() {
        return ( <div>
            <form className='form-group listForm'onSubmit={this.handleSubmit}>
            <label for='searchInput'>Search: </label>
            <input className='input' id='searchInput' name='search' onChange={this.handleChange}></input>
            <select className='listSelect' name="filterBy" onChange={this.handleSelect}>
                <option value="title">Title</option>
                <option value="category">Category</option>
                <option value="system">System</option>
            </select>
            <button className='btn btn-secondary' type="submit">🔎</button>
            </form>
            <div className='cardContainer'>
            {this.state.flag === false ?
            this.props.videoGames.map(vg => {
                return <div className='card' key={Math.random()}>
                    <h1>{vg.title}</h1>
                    <h3>Description: {vg.description}</h3>
                    <h4>System: {vg.system}</h4>
                    <h4>Price: {vg.price}</h4>
                    <h4>Category: {vg.category}</h4>
                    <Link to='/Detail' className='btn btn-secondary' onClick={ () => this.props.getVg(vg)} >View Product</Link>
                </div>}) 
                : 
            this.state.videoGames.map(vg => {
                return <div className='card' key={Math.random()}>
                    <h1>{vg.title}</h1>
                    <h3>Description: {vg.description}</h3>
                    <h4>System: {vg.system}</h4>
                    <h4>Price: {vg.price}</h4>
                    <h4>Category: {vg.category}</h4>
                    <Link to='/Detail' className='btn btn-secondary' onClick={ () => this.props.getVg(vg)} >View Product</Link>
                </div>})} 
                </div>
        </div>);
    }
}
 
export default VideoGameList
