import { styled } from "styled-components";

const BoardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    margin: 3rem 0;
    padding: 0;
    flex-direction: column;

    & ol {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 2rem;
        margin: 0;
        padding: 0;
    }

    & button {
        width: 8rem;
        height: 8rem;
        border: none;
        background: #aca788;
        color: #3f3b00;
        font-size: 5rem;
        cursor: pointer;
        font-family: "Caprasimo", cursive;
        padding: 1rem;
    }
`;

export default function GameBoard({ gameBoard, onSelectSquare }) {
    return (
        <BoardContainer>
            <ol>
                {gameBoard.map((row, rowIndex) => (
                    <ol key={rowIndex}>
                        {row.map((symbol, colIndex) => (
                            <li key={colIndex}>
                                <button
                                    onClick={() =>
                                        onSelectSquare(
                                            rowIndex,
                                            colIndex,
                                            symbol
                                        )
                                    }
                                >
                                    {symbol}
                                </button>
                            </li>
                        ))}
                    </ol>
                ))}
            </ol>
        </BoardContainer>
    );
}
