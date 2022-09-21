import styled from "styled-components";
import { Outlet } from "react-router-dom";
import UserInfo from "./UserInfo";

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
`;

export default function Dashboard() {
  return (
    <Wrapper>
      <Outlet />
      <UserInfo />
    </Wrapper>
  );
}
