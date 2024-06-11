import React, { useState } from 'react';
import Board from './components/Board';
import Game from './game/Game';
import './App.css';

const App = () => {
  const [game, setGame] = useState(new Game());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);

  const handleSquareClick = (x, y) => {
    if (gameEnded) return; 

    const newGame = new Game(); 
    newGame.board = game.board; 
    newGame.currentPlayer = game.currentPlayer; 

    if (selectedSquare) {
      newGame.movePiece(selectedSquare.x, selectedSquare.y, x, y);
      setSelectedSquare(null);
      setLegalMoves([]);
      setGame(newGame); 

      if (newGame.isCheckmate(newGame.currentPlayer)) {
        setGameEnded(true); 
      }
    } else {
      const piece = newGame.board[x][y];
      if (piece && piece.color === newGame.currentPlayer) {
        setSelectedSquare({ x, y });
        setLegalMoves(newGame.getLegalMoves(x, y));
      }
    }
  };

  const player1 = 'Player1';
  const player2 = 'Player2';
  const currentPlayer = game.currentPlayer === 'white' ? player1 : player2;

  return (
    <div className="app">
      <Board 
        board={game.board} 
        onSquareClick={handleSquareClick}
        selectedSquare={selectedSquare}
        legalMoves={legalMoves}
      />
      <div className="game-status">
        {game.getGameState() === 'started' ? (
          <p>Game in progress. Current turn: {currentPlayer === 'Player1' ? 'Player1 (White)' : 'Player2 (Black)'}</p>
        ) : (
          <p>Game ended.</p>
        )}
        {game.isCheck(game.currentPlayer) && (
          <p>Oops! {game.currentPlayer === 'white' ? 'White' : 'Black'} is in check.</p>
        )}
        {game.isStalemate() && <p>Stalemate! The game is drawn.</p>}
        {game.isCheckmate(game.currentPlayer) && (
          <p>Checkmate! Hooray!! {currentPlayer} wins.</p>
        )}
        {game.getGameState() === 'ended' && game.isKingCaptured && (
          <p>Oh no! King is captured. {currentPlayer} wins.</p>
        )}
      </div>
    </div>
  );
};

export default App;

