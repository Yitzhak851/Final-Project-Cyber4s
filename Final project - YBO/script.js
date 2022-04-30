/*----- Create Checkers Board  ------*/
const BOARD_SIZE = 8;
let center = document.createElement('center');
let CheckersTable = document.createElement('table');

for (let i = 0; i < BOARD_SIZE; i++) {

    let tr = document.createElement('tr');

    for (let j = 0; j < BOARD_SIZE; j++) {
        var td = document.createElement('td');

        if ((i + j) % 2 == 0) {
            td.setAttribute('class', 'cell light-cell');
            tr.appendChild(td);
        }

        else {
            td.setAttribute('class', 'cell dark-cell');
            tr.appendChild(td);
        }
    }

    CheckersTable.appendChild(tr);
}
center.appendChild(CheckersTable);

CheckersTable.setAttribute('cellspacing', '0');
CheckersTable.setAttribute('width', '400px');
document.body.appendChild(center);






// const WHITE_PLAYER = 'white';
// const BLACK_PLAYER = 'black';
// const PAWN = 'pawn';
// const ROOK = 'rook';
// const BISHOP = 'bishop';
// const KING = 'king';
// const CHECKERS_BOARD_ID = 'checkers-board';

// let table;