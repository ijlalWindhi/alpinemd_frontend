import styled from "styled-components"

const Container = styled.div`
    display: flex;
    flex-flow: column;

    padding: 1.5rem;
    border: solid 1px #ddd;
    border-radius: 16px;
    height: min-content;
`;

const Title = styled.h3`
    font-size: larger;
    font-weight: bold;
    margin-bottom: 0.5rem;
`;

const Body = styled.p`
`;

export default function Note({ title, body }) {
    return (
        <Container>
            <Title>{title}</Title>
            <Body>{body}</Body>
        </Container>
    )
}
