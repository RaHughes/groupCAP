import React, { Component } from 'react';
import axios from 'axios';

class ReviewForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userId: this.props.userId,
            videoGames: this.props.videoGamesPurchased,
            review: '',
            rating: 0
         }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSelect = (event) => {
        event.preventDefault()
        this.setState({
            rating: event.target.value
        })
    }

    handleSubmit = (event, id) => {
        event.preventDefault()
        console.log(id)
        axios({
            method: 'POST',
            url: 'https://localhost:44394/api/reviews',
            data: {
                "userId": this.state.userId,
                "videoGameId": parseInt(id),
                "rating": parseInt(this.state.rating),
                "reviewChar": this.state.review
            }
        })
        console.log('Review Created!')
        
    }

    render() { 
        return ( 
            <div>
                <h3>Please Leave a Review</h3><br/>
                {this.state.videoGames.map(vg => {
                    return(
                        <form onSubmit={() => this.handleSubmit(vg.id)} key={Math.random()}>
                            <h4>Title: {vg.title}</h4>
                            <label>Rating: </label>
                            <select name="rating" value={this.state.rating} onChange={this.handleSelect}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <label>Review: </label>
                            <input name='review' value={this.state.review} onChange={this.handleChange}></input>
                            <button type='submit'>Submit</button>
                        </form>
                    )
                })}
            </div>
         );
    }
}
 
export default ReviewForm;