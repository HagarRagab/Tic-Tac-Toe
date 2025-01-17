import { useState } from "react";

export default function Player({
    initialName,
    symbol,
    isActive,
    onChangePlayerName,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    const handleEditButton = function () {
        // Updating state based on previous state
        // setIsEditing(!isEditing); // Scedules updating state to true
        setIsEditing((editing) => !editing); // Will gurantee to get the latest value of
        if (isEditing) onChangePlayerName(symbol, playerName);
    };
    const handleChangeInput = function (e) {
        setPlayerName(e.target.value);
    };

    let playerNameElement = <span className="player-name">{playerName}</span>;

    if (isEditing)
        playerNameElement = (
            <input
                className="player-name"
                type="text"
                value={playerName}
                onChange={handleChangeInput}
                required
            />
        );

    return (
        <li className={isActive ? "active" : ""}>
            <span className="player">
                {playerNameElement}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditButton}>
                {isEditing ? "Save" : "Edit"}
            </button>
        </li>
    );
}
