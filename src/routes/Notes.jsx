import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
`;

const NotesWrapper = styled.div`
  flex: 0.75 0 auto;
  padding: 1.5rem;
`;

const UserinfoWrapper = styled.div`
  flex: 0.25 1 25em;
  padding: 1.5rem;
  border-left: solid 1px #ddd;

  display: flex;
  flex-flow: column;

  font-family: monospace;
  line-height: 1.1rem;

  & h2 {
    margin-bottom: 0.4em;
  }

  & p {
    margin-bottom: 0.325em;
    overflow-wrap: anywhere;
  }
`;

const Header2 = styled.h2`
  font-size: large;
  font-weight: 600;
`;

export default function Notes() {
  const {
    isAuthenticated,
    isLoading,
    getIdTokenClaims,
    getAccessTokenSilently,
  } = useAuth0();

  const [idToken, setIdToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
        getIdTokenClaims()
            .then(token => setIdToken(token))
            .catch(console.error);
    }
  }, [isAuthenticated, isLoading]);

  return (
    <Wrapper>
      <NotesWrapper></NotesWrapper>
      <UserinfoWrapper>
        {isAuthenticated && (
          <>
            <Header2>User Info</Header2>
            {idToken && (
                Object.entries(idToken).map(([key, value]) => (
                <p key={key}>
                    {key}: {value}
                </p>
                ))
            )}
          </>
        )}
      </UserinfoWrapper>
    </Wrapper>
  );
}
