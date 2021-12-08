import React from 'react';

const SellPage = props => {
  return (
    <div>
      {props.Games.map(game => {
        <div key={game.id}>
          <h1>{game.title}</h1>
          <h3>{game.description}</h3>
          <h4>{game.system}</h4>
          <h4>{game.price}</h4>
          <button>Details</button>
          <button>Edit</button>
          <button>Delete</button>
        </div>;
      })}
      <button>Add a New Game to Sell</button>
    </div>
  );
};

export default SellPage;
