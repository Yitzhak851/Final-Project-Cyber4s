
/*---------  Need TODO re-factor and find the bugggg ----------*/

class BoardData {
    constructor() {
        this.initPieces();
    }
    // Create list of pieces (32 total)


    initPieces() {
        this.pieces = [];
        for (let i = 0; i < BOARD_SIZE; i++) {
            this.pieces.push(new Piece(0, i, PIECES[i], WHITE_PLAYER));
            this.pieces.push(new Piece(1, i, PAWN, WHITE_PLAYER));
            this.pieces.push(new Piece(6, i, PAWN, BLACK_PLAYER));
            this.pieces.push(new Piece(7, i, PIECES[i], BLACK_PLAYER));
        }
    }
    // Returns piece in row, col, or undefined if not exists.
    getPiece(row, col) {
        for (const piece of this.pieces) {
            if (piece.row === row && piece.col === col) {
                return piece;
            }
        }
    }

    removePiece(row, col) {
        for (let i = 0; i < this.pieces.length; i++) {
            const piece = this.pieces[i];
            if (piece.row === row && piece.col === col) {
                // Remove piece at index i
                this.pieces.splice(i, 1);
                return piece;
            }
        }
    }

    isEmpty(row, col) {
        return this.getPiece(row, col) === undefined;
    }

    isPlayer(row, col, player) {
        const piece = this.getPiece(row, col);
        return piece !== undefined && piece.player === player;
    }
}

class Players {
    constructor(row, col, type, player) {
        this.row = row;
        this.col = col;
        this.type = type; // White || Black
        this.player = player; // Pawn || King
    }

    getOpponent() {
        if (this.player === WHITE_PLAYER) {
            return BLACK_PLAYER;
        }
        return WHITE_PLAYER;
    }

    getPossibleMoves(boardData) {
        let moves;
        if (this.type === PAWN) {
            moves = this.getPawnMoves(boardData);
        } else if (this.type === KING) {
            moves = this.getKingMoves(boardData);
        } else {
        }
        // Get filtered absolute moves
        let filteredMoves = [];
        for (const absoluteMove of moves) {
            const absoluteRow = absoluteMove[0];
            const absoluteCol = absoluteMove[1];
            if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
                filteredMoves.push(absoluteMove);
            }
        }
        return filteredMoves;
    }

    getMovesInDirection(directionRow, directionCol, boardData) {
        let result = [];

        for (let i = 1; i < BOARD_SIZE; i++) {
            let row = this.row + directionRow * i;
            let col = this.col + directionCol * i;
            if (boardData.isEmpty(row, col)) {
                result.push([row, col]);
            } else if (boardData.isPlayer(row, col, this.getOpponent())) {
                result.push([row, col]);
                return result;
            } else if (boardData.isPlayer(row, col, this.player)) {
                return result;
            }
        }
        return result;
    }


    // getBishopMoves(boardData) {
    //     let result = [];
    //     result = result.concat(this.getMovesInDirection(-1, -1, boardData));
    //     result = result.concat(this.getMovesInDirection(-1, 1, boardData));
    //     result = result.concat(this.getMovesInDirection(1, -1, boardData));
    //     result = result.concat(this.getMovesInDirection(1, 1, boardData));
    //     return result;
    // }

    getKingMoves(boardData) {
        let result = [];
        const relativeMoves = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
        for (let relativeMove of relativeMoves) {
            let row = this.row + relativeMove[0];
            let col = this.col + relativeMove[1];
            if (!boardData.isPlayer(row, col, this.player)) {
                result.push([row, col]);
            }
        }
        return result;
    }

}

class Game {
    constructor(firstPlayer) {
        this.boardData = new BoardData();
        this.currentPlayer = firstPlayer;
        this.winner = undefined;
    }

    // Tries to actually make a move. Returns true if successful.
    tryMove(piece, row, col) {
        const possibleMoves = this.getPossibleMoves(piece);

        for (const possibleMove of possibleMoves) {
            if (possibleMove[0] === row && possibleMove[1] === col) {
                const removedPiece = this.boardData.removePiece(row, col);
                piece.row = row;
                piece.col = col;
                if (removedPiece !== undefined && removedPiece === KING) {
                    this.winner = piece.player;
                }

                this.currentPlayer = piece.getOpponent();
                return true;
            }
        }
        return false;
    }

    getPossibleMoves(piece) {
        if (this.currentPlayer !== piece.player || this.winner !== undefined) {
            return [];
        }
        return piece.getPossibleMoves(this.boardData);
    }

    // //TODO - work on this
    // if(game.winner !== undefined) {
    // const winnerPopup = document.createElement('div');
    // // black -> B + lack -> Black
    // const winner = game.winner.charAt(0).toUpperCase() + game.winner.slice(1);
    // winnerPopup.textContent = winner + ' player wins!';
    // winnerPopup.classList.add('winner-dialog');
    // table.appendChild(winnerPopup)
}



