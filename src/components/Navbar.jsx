import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

import { useAuth } from "../contexts/auth-provider";
import styled from "styled-components";

import alpinemd_svg from "../assets/alpinemd.svg";
import {Link} from "react-router-dom";

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
  font-weight: 600;
  margin-top: 3px;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

export default function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <NavbarContainer>
      <LogoWrapper>
        <Link to="/notes">
          <img src={alpinemd_svg} alt="" width="39" height="25" />
        </Link>
        <TextLogo>AlpineMD</TextLogo>
      </LogoWrapper>
      <div>
        <NavbarList>
          {isAuthenticated ? (
            <li>
              <LogoutButton />
            </li>
          ) : (
            <li>
              <LoginButton />
            </li>
          )}
        </NavbarList>
      </div>
    </NavbarContainer>
  );
}
