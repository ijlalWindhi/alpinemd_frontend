import styled from "styled-components";
import { Outlet } from "react-router-dom";

const Wrapper = styled.div`
    flex-grow: 1;

    display: flex;

    overflow-y: clip;
`;

export default function Dashboard() {
    return (
        <Wrapper>
            <Outlet />
        </Wrapper>
    );
}
