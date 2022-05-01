let game;
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

function onCellClick(e) {
    if (selectedCell !== undefined)
        selectedCell.classList.remove('selected');

    selectedCell = e.currentTarget;
    selectedCell.classList.add('selected');
}

function startGame() {
    startButton.destroy();
    ball.body.velocity.set(150, -150);
    playing = true;
}

startButton = game.add.button(game.world.width*0.5, game.world.height*0.5, 'button', startGame, this, 1, 0, 2);
startButton.anchor.set(0.5);