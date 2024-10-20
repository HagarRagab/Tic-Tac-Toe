import { useState } from "react";
import { styled } from "styled-components";

const Li = styled.li`
    border: 2px solid transparent;
    padding: 0.5rem;
    border-radius: 4px;
    font-weight: bold;

    & .player-name {
        display: inline-block;
        width: 10rem;
        font-size: 1rem;
        color: #e1dec7;
        text-transform: uppercase;
        margin: 0;
        padding: 0.5rem;
        border-radius: 4px;
        text-overflow: ellipsis;
        text-align: center;
    }

    & input {
        font: inherit;
        font-size: 1rem;
        width: 10rem;
        border: none;
        padding: 0.5rem;
        animation: pulse-text 2s infinite;
        background-color: #46432f;
        text-align: center;
        text-transform: uppercase;
    }

    & .player-symbol {
        margin-left: 1rem;
        font-size: 1rem;
        color: #e1dec7;
    }
`;

export default function Player({ symbol, isActive, playerName, onChange }) {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditName = function () {
        setIsEditing((wasEditing) => !wasEditing);
    };

    let playerNameEle = <span className="player-name">{playerName}</span>;
    if (isEditing)
        playerNameEle = (
            <input
                type="text"
                value={playerName}
                onChange={(e) => onChange(symbol, e.target.value)}
            />
        );

    return (
        <Li className={isActive ? "active" : ""}>
            {playerNameEle}
            <span className="player-symbol">{symbol}</span>
            <button onClick={handleEditName}>
                {isEditing ? "Save" : "Edit"}
            </button>
        </Li>
    );
}
