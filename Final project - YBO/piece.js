class Piece {
    constructor(row, col, type, player) {
        this.row = row;
        this.col = col;
        this.type = type;
        this.player = player;
    }

    getPossibleMoves() {
        let moves;
        if (this.type === PAWN) {
            moves = this.getPawnMoves(Piece);
        } else if (this.type === undefined) {
            return onCellClick
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


    getPawnMoves(boardData) {
        let result = [];
        result = result.concat(this.getMovesInDirection(-1, -1, boardData));
        result = result.concat(this.getMovesInDirection(-1, 1, boardData));
        result = result.concat(this.getMovesInDirection(1, -1, boardData));
        result = result.concat(this.getMovesInDirection(1, 1, boardData));
        return result;
    }
}

// class Piece {
    // constructor(row, col, type, player) {
    //     this.row = row;
    //     this.col = col;
    //     this.type = type;
    //     this.player = player;
    // }

//     getOpponent() {
//         if (this.player === WHITE_PLAYER) {
//             return BLACK_PLAYER;
//         }
//         return WHITE_PLAYER;
//     }

//     getPossibleMoves(boardData) {
//         let moves;
//         if (this.type === PAWN) {
//             moves = this.getPawnMoves(boardData);
//         } else {
//         }

//         // Get filtered absolute moves
//         let filteredMoves = [];
//         for (const absoluteMove of moves) {
//             const absoluteRow = absoluteMove[0];
//             const absoluteCol = absoluteMove[1];
//             if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
//                 filteredMoves.push(absoluteMove);
//             }
//         }
//         return filteredMoves;
//     }

//     getPawnMoves(boardData) {
//         let result = [];
//         result = result.concat(this.getMovesInDirection(-1, -1, boardData));
//         result = result.concat(this.getMovesInDirection(-1, 1, boardData));
//         result = result.concat(this.getMovesInDirection(1, -1, boardData));
//         result = result.concat(this.getMovesInDirection(1, 1, boardData));
//         return result;
//     }


//     getMovesInDirection(directionRow, directionCol, boardData) {
//         let result = [];

//         for (let i = 1; i < BOARD_SIZE; i++) {
//             let row = this.row + directionRow * i;
//             let col = this.col + directionCol * i;
//             if (boardData.isEmpty(row, col)) {
//                 result.push([row, col]);
//             } else if (boardData.isPlayer(row, col, this.getOpponent())) {
//                 result.push([row, col]);
//                 return result;
//             } else if (boardData.isPlayer(row, col, this.player)) {
//                 return result;
//             }
//         }
//         return result;
//     }
// }