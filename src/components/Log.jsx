import { styled } from "styled-components";

const LogsContainer = styled.ol`
    max-width: 20rem;
    color: #3f3b00;
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    text-align: center;

    & li {
        border-radius: 4px;
        animation: slide-in-from-left 1s cubic-bezier(0.075, 0.82, 0.165, 1)
            forwards;
        margin: 0.75rem;

        &.highlighted {
            background-color: #3f3b00;
            color: white;
        }
    }
`;

export default function Log({ logs }) {
    return (
        <LogsContainer>
            {logs.map((log, i) => (
                <li
                    key={`${log.square.row}${log.square.col}`}
                    className={i === 0 ? "highlighted" : ""}
                >
                    {log.player} Selected {log.square.row}, {log.square.col}
                </li>
            ))}
        </LogsContainer>
    );
}
