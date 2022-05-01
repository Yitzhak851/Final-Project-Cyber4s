/*----- Checkers board - Create Checkers Board  ------*/
const BOARD_SIZE = 8;
const WHITE_TYPE = 'white';
const BLACK_TYPE = 'black';
const PAWN = 'pawn';
const KING = 'king';


let game;
let selectedCell;

function onCellClick(row, col) {
    // selectedPiece - The current selected piece (selected in previous click)
    // row, col - the currently clicked cell - it may be empty, or have a piece.
    if (selectedPiece !== undefined && game.tryMove(selectedPiece, row, col)) {
        selectedPiece = undefined;
        // Recreate whole board - this is not efficient, but doesn't affect user experience
        createChessBoard(game.boardData);
    } else {
        tryUpdateSelectedPiece(row, col);
    }
}

function addImage(cell, type, name) {
    const image = document.createElement('img');
    image.src = 'images/' + type + '/' + name + '.png';
    cell.appendChild(image);
}


function createCeckersBoard() {
    const table = document.createElement('table');
    document.body.appendChild(table);
    for (i = 0; i < BOARD_SIZE; i++) {     // 0-7  -->
        const row = table.insertRow();
        for (j = 0; j < BOARD_SIZE; j++) {     // 0-7 -->
            const cell = row.insertCell();
            cell.id = 'cell-' + i.toString() + "_" + j.toString();
            if ((i + j) % 2 === 0) {          // 0+0%2=0 light, 1+0%2=0 dark
                cell.className = 'light-cell';
            } else {
                cell.className = 'dark-cell';
            }
            cell.addEventListener('click', onCellClick);

            /*------------ Creating checkers pieces for 2 players ------------*/
            if (i < 3 && cell.className === 'dark-cell') {
                addImage(cell, BLACK_TYPE, 'pawn')
            } else if (i > 4 && cell.className === 'dark-cell') {
                addImage(cell, WHITE_TYPE, 'pawn')
            }
        }
    }
}

// function createChessBoard(boardData) {
//     table = document.getElementById(CHESS_BOARD_ID);
//     if (table !== null) {
//         table.remove();
//     }
//     // Create empty chess board HTML:
//     table = document.createElement('table');
//     table.id = CHESS_BOARD_ID;
//     document.body.appendChild(table);
//     for (let row = 0; row < BOARD_SIZE; row++) {
//         const rowElement = table.insertRow();
//         for (let col = 0; col < BOARD_SIZE; col++) {
//             const cell = rowElement.insertCell();
//             if ((row + col) % 2 === 0) {
//                 cell.className = 'light-cell';
//             } else {
//                 cell.className = 'dark-cell';
//             }
//             cell.addEventListener('click', () => onCellClick(row, col));
//         }
//     }
//     // Add pieces images to board
//     for (let piece of boardData.pieces) {
//         const cell = table.rows[piece.row].cells[piece.col];
//         addImage(cell, piece.player, piece.type);
//     }





window.addEventListener('load', createCeckersBoard);