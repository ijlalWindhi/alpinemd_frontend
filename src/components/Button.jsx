import styled from "styled-components";

export const Button = styled.button`
    background-color: ${props => props.primary ? "#4772ff" : "white"};
    color: ${props => props.primary ? "white" : "black"};

    padding: 0.5rem;
    font-size: 100%;
    border: none;
    border-radius: 5px;
`;