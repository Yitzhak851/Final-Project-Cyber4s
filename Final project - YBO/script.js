/*----- Checkers board - Create Checkers Board  ------*/
const BOARD_SIZE = 8;
const WHITE_TYPE = 'white';
const BLACK_TYPE = 'black';
const PAWN = 'pawn';
const KING = 'king';

var close = document.getElementsByClassName("closebtn");
var i;

for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement;
        div.style.opacity = "0";
        setTimeout(function () { div.style.display = "none"; }, 600);
    }
}

let game;
let selectedCell;

function onCellClick(e) {
    if (selectedCell !== undefined)
        selectedCell.classList.remove('selected');

    selectedCell = e.currentTarget;
    selectedCell.classList.add('selected');
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




window.addEventListener('load', createCeckersBoard);