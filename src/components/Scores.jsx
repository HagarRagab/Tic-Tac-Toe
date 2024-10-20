import { styled } from "styled-components";

const ScoresContainer = styled.div`
    width: fit-content;
    margin-top: 3rem;
    margin-inline: auto;

    & span {
        font-size: 2rem;
        margin-inline: 2rem;
        border: 2px solid #f6e35a;
        border-radius: 4px;
        padding: 0.5rem 2rem;
    }

    & span.active {
        color: #f6e35a;
    }
`;

export default function Scores({ scores }) {
    return (
        <ScoresContainer>
            <span className={scores.X > scores.O ? "active" : ""}>
                {scores.X}
            </span>
            VS
            <span className={scores.O > scores.X ? "active" : ""}>
                {scores.O}
            </span>
        </ScoresContainer>
    );
}
