import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem 2rem;

  border-bottom: #ddd 1px solid;
`;

const NavbarList = styled.ul`
  display: flex;
  gap: 1rem;
`;

const TextLogo = styled.span`
  font-size: larger;
  font-weight: bold;
`;

export default function Navbar() {
  const { isAuthenticated } = useAuth0();

  return (
    <NavbarContainer>
      <div className="navbar__left-side">
        <TextLogo>AlpineMD</TextLogo>
      </div>
      <div className="navbar__right-side">
        <NavbarList>
          {isAuthenticated ? (
            <li className="navbar__item">
              <LogoutButton />
            </li>
          ) : (
            <li className="navbar__item">
              <LoginButton />
            </li>
          )}
        </NavbarList>
      </div>
    </NavbarContainer>
  );
}
