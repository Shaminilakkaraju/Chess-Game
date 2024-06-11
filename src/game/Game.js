import { Pawn, Rook, Knight, Bishop, Queen, King } from './Piece';

class Game {
  constructor() {
    this.board = this.initializeBoard();
    this.currentPlayer = 'white';
    this.gameState = 'started';
  }

  initializeBoard() {
    const board = Array(8).fill(null).map(() => Array(8).fill(null));


    for (let i = 0; i < 8; i++) {
      board[1][i] = new Pawn('black');
      board[6][i] = new Pawn('white');
    }

    const pieceOrder = [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook];
    for (let i = 0; i < 8; i++) {
      board[0][i] = new pieceOrder[i]('black');
      board[7][i] = new pieceOrder[i]('white');
    }

    return board;
  }

  movePiece(startX, startY, endX, endY) {
    const piece = this.board[startX][startY];
    if (piece && piece.color === this.currentPlayer) {
      const legalMoves = this.getLegalMoves(startX, startY);
      if (legalMoves.some(([x, y]) => x === endX && y === endY)) {
        const capturedPiece = this.board[endX][endY];
        if (capturedPiece instanceof King) {
          this.endGame(); 
        }
        this.board[endX][endY] = piece;
        this.board[startX][startY] = null;

        if (piece instanceof Pawn && (endX === 0 || endX === 7)) {
         
        }
    
        this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
      }
    }
  }

  getLegalMoves(x, y) {
    const piece = this.board[x][y];
    if (piece && piece.color === this.currentPlayer) {
      return piece.getLegalMoves(this.board, x, y);
    }
    return [];
  }

  isCheck(color) {
    const kingPosition = this.findKing(color);
    if (!kingPosition) return false; 
  
    const [kingX, kingY] = kingPosition;
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const piece = this.board[x][y];
        if (piece && piece.color !== color) {
          const legalMoves = piece.getLegalMoves(this.board, x, y);
          if (legalMoves.some(([endX, endY]) => endX === kingX && endY === kingY)) {
            return true;
          }
        }
      }
    }
    return false;
  }
  

  isCheckmate(color) {
    if (!this.isCheck(color)) return false;
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const piece = this.board[x][y];
        if (piece && piece.color === color) {
          const legalMoves = piece.getLegalMoves(this.board, x, y);
          for (const [endX, endY] of legalMoves) {
            const newGame = new Game();
            newGame.board = this.cloneBoard();
            newGame.currentPlayer = this.currentPlayer;
            newGame.movePiece(x, y, endX, endY);
            if (!newGame.isCheck(color)) {
              return false;
            }
          }
        }
      }
    }
    return true;
  }
  
  isStalemate() {
    if (this.isCheck(this.currentPlayer)) return false;
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const piece = this.board[x][y];
        if (piece && piece.color === this.currentPlayer) {
          const legalMoves = piece.getLegalMoves(this.board, x, y);
          if (legalMoves.length > 0) {
            return false;
          }
        }
      }
    }
    return true;
  }

  promotePawn(x, y, promotionPiece) {
    if (this.board[x][y] instanceof Pawn) {
      this.board[x][y] = new promotionPiece(this.currentPlayer);
    }
  }

  endGame() {
    this.gameState = 'ended';
  }

  getGameState() {
    return this.gameState;
  }

  cloneBoard() {
    return this.board.map(row => row.slice());
  }

  findKing(color) {
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const piece = this.board[x][y];
        if (piece instanceof King && piece.color === color) {
          return [x, y];
        }
      }
    }
    return null; 
  }
}

export default Game;