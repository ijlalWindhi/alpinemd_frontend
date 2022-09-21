import {useAuth0} from "@auth0/auth0-react";
import {useEffect, useState} from "react";
import styled from "styled-components";

const UserinfoWrapper = styled.div`
  flex-basis: 30em;
  flex-shrink: 0;
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

  overflow-y: scroll;
`;

const Header2 = styled.h2`
  font-size: large;
  font-weight: 600;
`;

export default function UserInfo() {
  const {
    isAuthenticated,
    isLoading,
    getIdTokenClaims,
    getAccessTokenSilently
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

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: "https://alpinemd.com/",
          scope: "read:notes create:notes update:notes delete:notes",
          detailedResponse: true
        });

        setAccessToken(accessToken);
      } catch (e) {
        console.error(e.message);
      }
    }

    getAccessToken();
  }, [getAccessTokenSilently]);

  return (
    <UserinfoWrapper>
      {isAuthenticated && (
        <>
          <Header2>User Info</Header2>
          {idToken &&
            Object.entries(idToken).map(([key, value]) => (
              <p key={key}>
                {key}: {value}
              </p>
            ))}
          <Header2>Access Token Info</Header2>
          {accessToken &&
            Object.entries(accessToken).map(([key, value]) => (
              <p key={key}>
                {key}: {value}
              </p>
            ))}
        </>
      )}
    </UserinfoWrapper>
  );
}
