import React from 'react';

const VideoGameDetail = (props) => {
    return ( 
        <div>
            <h1>{props.videoGame.title}</h1>
            <h3>{props.videoGame.description}</h3>
            <h4>{props.videoGame.system}</h4>
            <h4>{props.videoGame.price}</h4>
            <button onClick={() => props.buyVideoGame()}>Buy Product</button>
        </div>
     );
}

export default VideoGameDetail;