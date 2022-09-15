import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  flex-flow: column;
  gap: 0.5rem;
`;

const Header = styled.h1`
  font-weight: 600;
`;

export default function Welcome() {
  return (
    <Wrapper>
      <Header>Welcome to AlpineMD!</Header>
      <p>
        Please login first
      </p>
    </Wrapper>
  );
}
