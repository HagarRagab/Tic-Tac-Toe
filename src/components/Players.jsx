import { styled } from "styled-components";
import Player from "./Player";

const PlayersContainer = styled.ol`
    list-style: none;
    padding: 0;
    margin: 1rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    &.highlight-player {
        & li {
            display: flex;
            align-items: center;
            width: 50%;
            border: 2px solid transparent;

            &.active {
                border-color: #f6e35a;
                animation: pulse 2s infinite ease-in-out;

                & .player-name,
                & .player-symbol {
                    color: #f6e35a;
                }
            }
        }
    }

    & button {
        width: 3rem;
        border: none;
        background: none;
        color: #c3ba78;
        font-size: 0.9rem;
        cursor: pointer;
        transition: color 0.2s;
        padding: 0.5rem 0.25rem 0.25rem 0.25rem;
        text-align: center;

        &:hover {
            color: #f8ca31;
        }
    }
`;

export default function Players({ activePlayer, players, ...props }) {
    return (
        <PlayersContainer className="highlight-player">
            <Player
                playerName={players.X.name}
                symbol="X"
                isActive={activePlayer === "X"}
                {...props}
            />
            <Player
                playerName={players.O.name}
                symbol="O"
                isActive={activePlayer === "O"}
                {...props}
            />
        </PlayersContainer>
    );
}
