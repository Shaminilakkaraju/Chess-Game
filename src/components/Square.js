import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChessPawn, 
  faChessRook, 
  faChessKnight, 
  faChessBishop, 
  faChessQueen, 
  faChessKing 
} from '@fortawesome/free-solid-svg-icons';
import './Square.css';

const getPieceIcon = (piece) => {
  if (!piece) return null;
  const color = piece.color === 'white' ? 'white' : 'black';
  switch (piece.type) {
    case 'pawn': return <FontAwesomeIcon icon={faChessPawn} className={`piece ${color}`} />;
    case 'rook': return <FontAwesomeIcon icon={faChessRook} className={`piece ${color}`} />;
    case 'knight': return <FontAwesomeIcon icon={faChessKnight} className={`piece ${color}`} />;
    case 'bishop': return <FontAwesomeIcon icon={faChessBishop} className={`piece ${color}`} />;
    case 'queen': return <FontAwesomeIcon icon={faChessQueen} className={`piece ${color}`} />;
    case 'king': return <FontAwesomeIcon icon={faChessKing} className={`piece ${color}`} />;
    default: return null;
  }
};

const Square = ({ piece, onClick, isSelected, isLegalMove }) => {
  return (
    <div
      className={`square ${isSelected ? 'selected' : ''} ${isLegalMove ? 'legal-move' : ''}`}
      onClick={onClick}
    >
      {getPieceIcon(piece)}
    </div>
  );
};

export default Square;
