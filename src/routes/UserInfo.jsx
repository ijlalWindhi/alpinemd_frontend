import { useAuth } from "../contexts/auth-provider";
import { useEffect, useState } from "react";
import styled from "styled-components";
import jwtDecode from "jwt-decode";

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
    const { isAuthenticated, isLoading, getAccessToken, user } = useAuth();

    const [idToken, setIdToken] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            setIdToken(user);
        }
    }, [isAuthenticated, isLoading]);

    useEffect(() => {
        const getAccessTokenInfo = async () => {
            try {
                const accessToken = await getAccessToken({
                    audience: "https://alpinemd.com/",
                    scope: "read:notes create:notes update:notes delete:notes",
                    detailedResponse: true,
                });

                setAccessToken(accessToken);
            } catch (e) {
                console.error(e.message);
            }
        };

        getAccessTokenInfo();
    }, [getAccessToken]);

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
                    <p>
                        {accessToken &&
                            Object.entries(jwtDecode(accessToken)).map(
                                ([key, value]) => (
                                    <p key={key}>
                                        {key}: {value}
                                    </p>
                                )
                            )}
                    </p>
                    <p style={{ color: "darkslategray" }}>{accessToken}</p>
                </>
            )}
        </UserinfoWrapper>
    );
}
