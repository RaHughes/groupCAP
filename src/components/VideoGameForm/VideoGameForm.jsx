import React, { Component } from 'react';

class VideoGameForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: '',
            description: '',
            category: '',
            system: '',
            price: '',
            rating: ''
         }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() { 
        return ( <div>
            <label> Title:  </label>
            <input name='title' value={this.state.title} onChange={this.handleChange}/>
            <label> Description: </label>
            <input name='description' value={this.state.description} onChange={this.handleChange}/>
            <label> Category: </label>
            <input name='category' value={this.state.category} onChange={this.handleChange}/>
            <label> System: </label>
            <input name='system' value={this.state.system} onChange={this.handleChange}/>
            <label> Price: </label>
            <input name='price' value={this.state.price} onChange={this.handleChange}/>
            <label> Rating: </label>
            <input name='rating' value={this.state.rating} onChange={this.handleChange}/>
        </div> );
    }
}
 
export default VideoGameForm;
