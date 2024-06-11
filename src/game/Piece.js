class Piece {
    constructor(color) {
      this.color = color;
    }
  
    isEmptySquare(square) {
      return !square;
    }
  
    isOpponentPiece(square) {
      return square && square.color !== this.color;
    }
  
    getLegalMoves(board, x, y) {
      return [];
    }
  }
  
  class Pawn extends Piece {
    constructor(color) {
      super(color);
      this.type = 'pawn';
    }
  
    getLegalMoves(board, x, y) {
      const moves = [];
      const direction = this.color === 'white' ? -1 : 1;
  
      if (this.isEmptySquare(board[x + direction][y])) {
        moves.push([x + direction, y]);
        if ((x === 6 && this.color === 'white') || (x === 1 && this.color === 'black')) {
          if (this.isEmptySquare(board[x + 2 * direction][y])) {
            moves.push([x + 2 * direction, y]);
          }
        }
      }
  
      if (y > 0 && this.isOpponentPiece(board[x + direction][y - 1])) {
        moves.push([x + direction, y - 1]);
      }
  
      if (y < 7 && this.isOpponentPiece(board[x + direction][y + 1])) {
        moves.push([x + direction, y + 1]);
      }
  
      return moves;
    }
  }
  
  class Rook extends Piece {
    constructor(color) {
      super(color);
      this.type = 'rook';
    }
  
    getLegalMoves(board, x, y) {
      const moves = [];
      const directions = [
        [1, 0], [-1, 0], [0, 1], [0, -1]
      ];
  
      for (let [dx, dy] of directions) {
        for (let i = 1; i < 8; i++) {
          const nx = x + dx * i;
          const ny = y + dy * i;
          if (nx >= 0 && ny >= 0 && nx < 8 && ny < 8) {
            if (this.isEmptySquare(board[nx][ny])) {
              moves.push([nx, ny]);
            } else if (this.isOpponentPiece(board[nx][ny])) {
              moves.push([nx, ny]);
              break;
            } else {
              break;
            }
          }
        }
      }
  
      return moves;
    }
  }
  
  class Knight extends Piece {
    constructor(color) {
      super(color);
      this.type = 'knight';
    }
  
    getLegalMoves(board, x, y) {
      const moves = [];
      const directions = [
        [2, 1], [2, -1], [-2, 1], [-2, -1],
        [1, 2], [1, -2], [-1, 2], [-1, -2]
      ];
  
      for (let [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && ny >= 0 && nx < 8 && ny < 8) {
          if (this.isEmptySquare(board[nx][ny]) || this.isOpponentPiece(board[nx][ny])) {
            moves.push([nx, ny]);
          }
        }
      }
  
      return moves;
    }
  }
  
  class Bishop extends Piece {
    constructor(color) {
      super(color);
      this.type = 'bishop';
    }
  
    getLegalMoves(board, x, y) {
      const moves = [];
      const directions = [
        [1, 1], [1, -1], [-1, 1], [-1, -1]
      ];
  
      for (let [dx, dy] of directions) {
        for (let i = 1; i < 8; i++) {
          const nx = x + dx * i;
          const ny = y + dy * i;
          if (nx >= 0 && ny >= 0 && nx < 8 && ny < 8) {
            if (this.isEmptySquare(board[nx][ny])) {
              moves.push([nx, ny]);
            } else if (this.isOpponentPiece(board[nx][ny])) {
              moves.push([nx, ny]);
              break;
            } else {
              break;
            }
          }
        }
      }
  
      return moves;
    }
  }
  
  class Queen extends Piece {
    constructor(color) {
      super(color);
      this.type = 'queen';
    }
  
    getLegalMoves(board, x, y) {
      const moves = [];
      const directions = [
        [1, 0], [-1, 0], [0, 1], [0, -1],
        [1, 1], [1, -1], [-1, 1], [-1, -1]
      ];
  
      for (let [dx, dy] of directions) {
        for (let i = 1; i < 8; i++) {
          const nx = x + dx * i;
          const ny = y + dy * i;
          if (nx >= 0 && ny >= 0 && nx < 8 && ny < 8) {
            if (this.isEmptySquare(board[nx][ny])) {
              moves.push([nx, ny]);
            } else if (this.isOpponentPiece(board[nx][ny])) {
              moves.push([nx, ny]);
              break;
            } else {
              break;
            }
          }
        }
      }
  
      return moves;
    }
  }
  
  class King extends Piece {
    constructor(color) {
      super(color);
      this.type = 'king';
    }
  
    getLegalMoves(board, x, y) {
      const moves = [];
      const directions = [
        [1, 0], [-1, 0], [0, 1], [0, -1],
        [1, 1], [1, -1], [-1, 1], [-1, -1]
      ];
  
      for (let [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && ny >= 0 && nx < 8 && ny < 8) {
          if (this.isEmptySquare(board[nx][ny]) || this.isOpponentPiece(board[nx][ny])) {
            moves.push([nx, ny]);
          }
        }
      }
  
      return moves;
    }
  }
  
  export { Piece, Pawn, Rook, Knight, Bishop, Queen, King };
  