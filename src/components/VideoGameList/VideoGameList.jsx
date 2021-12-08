import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const VideoGameList = (props) => {
 
        return ( <div>
            {props.videoGames.map(vg => {
                return <div key={Math.random()}>
                    <h1>{vg.title}</h1>
                    <h3>{vg.description}</h3>
                    <h4>{vg.system}</h4>
                    <h4>{vg.price}</h4>
                    <Link to='/Detail' onClick={ () => props.getVg(vg)} >View Product</Link>
                </div>
            })}
        </div> );
    }

 
export default VideoGameList;
