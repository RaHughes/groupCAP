import React from 'react';
import './VideoGameDetail.css'

const VideoGameDetail = (props) => {
    return ( 
        <div className='detail'>
            <h1>Title: {props.videoGame.title}</h1>
            <h3>Description: {props.videoGame.description}</h3>
            <h4>System: {props.videoGame.system}</h4>
            <h4>Price: ${props.videoGame.price}</h4>
            {props.user !== '' ? <button class='btn btn-secondary' onClick={() => props.buyVideoGame()}>Buy Product</button> : <h4>You must be logged in to purchase this game</h4>}
            {props.reviews.map(rv => {
                if(props.videoGame.id === rv.videoGameId){
                  return(
                    <div className='reviews'>
                        <h5>Reviewer: {rv.user.firstName} {rv.user.lastName}</h5>
                        <p>Rating: {rv.rating}</p>
                        <p>Review: {rv.reviewChar}</p>
                    </div>
                )  
                }
            })}
        </div>
     );
}

export default VideoGameDetail;