/*----- Checkers board - Create Checkers Board  ------*/
const BOARD_SIZE = 8;
const WHITE_TYPE = 'white';
const BLACK_TYPE = 'black';
const PAWN = 'pawn';
const KING = 'king';

let game;
let table;
let selectedCell;

// Clear all previous possible moves
function tryUpdateSelectedPiece(row, col) {
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            table.rows[i].cells[j].classList.remove('possible-move');
            table.rows[i].cells[j].classList.remove('selected');
        }
    }
    // Show possible moves
    const piece = game.boardData.getPiece(row, col);
    if (piece !== undefined) {
        let possibleMoves = game.getPossibleMoves(piece);
        for (let possibleMove of possibleMoves) {
            const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
            cell.classList.add('possible-move');
        }
    }

    table.rows[row].cells[col].classList.add('selected');
    selectedPiece = piece;
}

function addImage(cell, type, name) {
    const image = document.createElement('img');
    image.src = 'images/' + type + '/' + name + '.png';
    cell.appendChild(image);
}

function onCellClick(e) {
    if (selectedCell !== undefined)
        selectedCell.classList.remove('selected');

    selectedCell = e.currentTarget;
    selectedCell.classList.add('selected');
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


/*-------------- TODO - Add optional move!!! --------------*/

// // Add pieces images to board
// for (let piece of boardData.pieces) {
//     const cell = table.rows[piece.row].cells[piece.col];
//     addImage(cell, piece.player, piece.type);
// }

// if (game.winner !== undefined) {
//     const winnerPopup = document.createElement('div');
//     // black -> B + lack -> Black
//     const winner = game.winner.charAt(0).toUpperCase() + game.winner.slice(1);
//     winnerPopup.textContent = winner + ' player wins!';
//     winnerPopup.classList.add('winner-dialog');
//     table.appendChild(winnerPopup)
window.addEventListener('load', createCeckersBoard);

