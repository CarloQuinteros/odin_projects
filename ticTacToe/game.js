function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const dropToken = (row, column, player) => {
        if (board[row][column].getValue() !== "") return false;
        board[row][column].addToken(player);
        return true;
    };

    const printBoard = () => {
        const boardWithCellValues = board.map(row => row.map(cell => cell.getValue()));
        console.log(boardWithCellValues);
    };

    return { getBoard, dropToken, printBoard };
}

function Cell() {
    let value = "";

    const addToken = (player) => {
        value = player;
    };

    const getValue = () => value;

    return { addToken, getValue };
}

function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = Gameboard();
    let gameOver = false;

    const players = [
        { name: playerOneName, token: 'X' },
        { name: playerTwoName, token: 'O' }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const checkWinner = () => {
        const b = board.getBoard().map(row => row.map(cell => cell.getValue()));
        const lines = [
            ...b,
            ...b[0].map((_, i) => [b[0][i], b[1][i], b[2][i]]),
            [b[0][0], b[1][1], b[2][2]],
            [b[0][2], b[1][1], b[2][0]]
        ];
        return lines.some(line => line.every(cell => cell === activePlayer.token));
    };

    const playRound = (row, column) => {
        if (gameOver || !board.dropToken(row, column, activePlayer.token)) return;

        if (checkWinner()) {
            gameOver = true;
            alert(`${activePlayer.name} wins!`);
            return;
        }

        switchPlayerTurn();
        printNewRound();
    };

    const resetGame = () => {
        location.reload(); // reload page
    };

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    printNewRound();

    return { playRound, getActivePlayer, getBoard: board.getBoard, resetGame };
}

function ScreenController() {
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const resetButton = document.querySelector('.reset');

    const updateScreen = () => {
        boardDiv.textContent = "";
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();
        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = colIndex;
                cellButton.textContent = cell.getValue();
                
                if (cell.getValue() === 'X') cellButton.style.color = "red";
                if (cell.getValue() === 'O') cellButton.style.color = "blue";
                
                boardDiv.appendChild(cellButton);
            });
        });
    };

    function clickHandlerBoard(e) {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;
        if (selectedRow === undefined || selectedColumn === undefined) return;
        game.playRound(Number(selectedRow), Number(selectedColumn));
        updateScreen();
    }

    function handleReset() {
        game.resetGame();
    }

    boardDiv.addEventListener("click", clickHandlerBoard);
    resetButton.addEventListener("click", handleReset);
    updateScreen();
}

ScreenController();
