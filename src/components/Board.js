import React from 'react';
import Square from './Square';
import './Board.css';

const Board = ({ board, onSquareClick, selectedSquare, legalMoves }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((square, colIndex) => {
            const color = (rowIndex + colIndex) % 2 === 0 ? '#ffce9e' : '#d18b47';

            return (
              <Square
                key={colIndex}
                piece={square}
                color={color}
                onClick={() => onSquareClick(rowIndex, colIndex)}
                isSelected={selectedSquare && selectedSquare.x === rowIndex && selectedSquare.y === colIndex}
                isLegalMove={legalMoves.some(([x, y]) => x === rowIndex && y === colIndex)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
