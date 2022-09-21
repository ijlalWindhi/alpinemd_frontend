import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Navbar from "../components/Navbar";

const RootContainer = styled.div`
  height: 100vh;

  display: flex;
  flex-flow: column;
`;

export default function Root() {
  return (
    <RootContainer>
      <Navbar />
      <Outlet />
    </RootContainer>
  );
}
