import { useState } from "react";
import { styled } from "styled-components";
import Players from "./components/Players";
import Scores from "./components/Scores.jsx";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WIN_CASES } from "./wincases.js";

const GameContainer = styled.div`
    max-width: 45rem;
    margin: 3rem auto;
    padding: 2rem;
    border-radius: 6px;
    background: linear-gradient(#383624, #282617);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    position: relative;
`;

const INIT_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

const INIT_PLAYERS = {
    X: {
        name: "Player 1",
        score: 0,
    },
    O: {
        name: "Player 2",
        score: 0,
    },
};

const derivedActivePlayer = function (logs) {
    let currentPlayer = logs.length > 0 && logs[0].player === "X" ? "O" : "X";
    return currentPlayer;
};

const derivedGameBoard = function (logs) {
    let gameBoard = [...INIT_GAME_BOARD.map((row) => [...row])];
    logs.map((log) => {
        const { square, player } = log;
        const { row, col } = square;
        gameBoard[row][col] = player;
    });
    return gameBoard;
};

const derivedWinner = function (players, gameBoard) {
    let isWinner;
    for (const winCase of WIN_CASES) {
        const firstSquareSymbol = gameBoard[winCase[0].row][winCase[0].col];
        const secondSquareSymbol = gameBoard[winCase[1].row][winCase[1].col];
        const thirdSquareSymbol = gameBoard[winCase[2].row][winCase[2].col];
        if (
            firstSquareSymbol !== null &&
            firstSquareSymbol === secondSquareSymbol &&
            firstSquareSymbol === thirdSquareSymbol
        ) {
            isWinner = players[firstSquareSymbol].name;
            players[firstSquareSymbol].score++;
        }
    }
    return isWinner;
};

function App() {
    const [players, setPlayers] = useState(INIT_PLAYERS);
    const [logs, setLogs] = useState([]);

    let activePlayer = derivedActivePlayer(logs);
    const gameBoard = derivedGameBoard(logs);
    const isWinner = derivedWinner(players, gameBoard);

    const handleChangeName = function (symbol, newName) {
        setPlayers((prevPlayersInfo) => {
            prevPlayersInfo[symbol].name = newName;
            return prevPlayersInfo;
        });
    };

    const handleSelectSquare = function (rowIndex, colIndex, symbol) {
        if (symbol) return;
        setLogs((prevLogs) => {
            return [
                {
                    square: {
                        row: rowIndex,
                        col: colIndex,
                    },
                    player: derivedActivePlayer(prevLogs),
                },
                ...prevLogs,
            ];
        });
    };

    const handleRematch = function () {
        setLogs([]);
    };

    return (
        <>
            <GameContainer>
                <Players
                    activePlayer={activePlayer}
                    players={players}
                    onChange={handleChangeName}
                />
                <Scores scores={{ X: players.X.score, O: players.O.score }} />
                <GameBoard
                    gameBoard={gameBoard}
                    onSelectSquare={handleSelectSquare}
                />
                {(isWinner || logs.length === 9) && (
                    <GameOver winner={isWinner} onClick={handleRematch} />
                )}
            </GameContainer>
            <Log logs={logs} />
        </>
    );
}

export default App;
