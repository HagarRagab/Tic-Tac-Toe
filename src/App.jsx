import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-compenations.js";

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

const PLAYERS = {
    X: "Player 1",
    O: "Player 2",
};

const deriveActivePlayer = function (turns) {
    let currentPlayer = "X";
    if (turns.length > 0 && turns[0].player === "X") currentPlayer = "O";
    return currentPlayer;
};

const deriveWinner = function (gameBoard, players) {
    let winner;
    // Check if there is a winner
    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol =
            gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol =
            gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol =
            gameBoard[combination[2].row][combination[2].column];

        if (
            firstSquareSymbol &&
            firstSquareSymbol === secondSquareSymbol &&
            firstSquareSymbol === thirdSquareSymbol
        )
            winner = players[firstSquareSymbol];
    }
    return winner;
};

const deriveGameBoard = function (gameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map((innerArr) => [...innerArr])];
    gameTurns.forEach((turn) => {
        const { square, player } = turn;
        const { row, col } = square;
        gameBoard[row][col] = player;
    });
    return gameBoard;
};

function App() {
    const [gameTurns, setGameTurns] = useState([]);
    // const [activePlayer, setActivePlayer] = useState("X");
    const [players, setPlayers] = useState(PLAYERS);

    let hasDraw = false;
    // Derived state / computed value
    const activePlayer = deriveActivePlayer(gameTurns);

    const gameBoard = deriveGameBoard(gameTurns);

    // Check if there is a winner
    const winner = deriveWinner(gameBoard, players);

    hasDraw = gameTurns.length === 9 && !winner;

    const handleSelectSquare = function (rowIndex, colIndex) {
        // setActivePlayer((currentPlayer) => (currentPlayer === "X" ? "O" : "X"));

        setGameTurns((prevGameTurns) => {
            const currentPlayer = deriveActivePlayer(prevGameTurns);
            const updatedGameTurns = [
                {
                    square: { row: rowIndex, col: colIndex },
                    player: currentPlayer,
                },
                ...prevGameTurns,
            ];
            return updatedGameTurns;
        });
    };

    const handleChangePlayerName = function (symbol, newName) {
        setPlayers((prevPlayers) => {
            return {
                ...prevPlayers,
                [symbol]: newName,
            };
        });
    };

    const handleClickRematch = function () {
        setGameTurns([]);
    };

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player
                        initialName={PLAYERS.X}
                        symbol="X"
                        isActive={activePlayer === "X"}
                        onChangePlayerName={handleChangePlayerName}
                    />
                    <Player
                        initialName={PLAYERS.O}
                        symbol="O"
                        isActive={activePlayer === "O"}
                        onChangePlayerName={handleChangePlayerName}
                    />
                </ol>
                <GameBoard
                    onSelectSquare={handleSelectSquare}
                    gameBoard={gameBoard}
                />
                {(winner || hasDraw) && (
                    <GameOver winner={winner} onRematch={handleClickRematch} />
                )}
            </div>
            <Log turns={gameTurns} />
        </main>
    );
}

export default App;
