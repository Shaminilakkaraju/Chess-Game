import React from 'react';

const GameStatus = ({ currentPlayer, gameState, game }) => {
  let statusMessage;

  switch (gameState) {
    case 'started':
      statusMessage = `Game started - Current turn: ${currentPlayer === 'white' ? "Player 1" : "Player 2"} (White)`;
      break;
    case 'ended':
      statusMessage = 'Game ended';
      break;
    case 'kingCaptured':
      statusMessage = `Oh no! King is captured - ${currentPlayer === 'white' ? "Player 2" : "Player 1"} wins`;
      break;
    default:
      if (game.isCheck(currentPlayer)) {
        statusMessage = `Oops! ${currentPlayer === 'white' ? "Black" : "White"}'s king is in check`;
      } else if (game.isCheckmate(currentPlayer)) {
        statusMessage = `Checkmate - Hooray! ${currentPlayer === 'white' ? "Player 1" : "Player 2"} wins by checkmate`;
      } else if (game.isStalemate()) {
        statusMessage = 'Stalemate - The game is drawn due to stalemate';
      } else {
        statusMessage = '';
      }
  }

 

  return (
    <div className="game-status">
      {statusMessage}
      <br />
    </div>
  );
};

export default GameStatus;
