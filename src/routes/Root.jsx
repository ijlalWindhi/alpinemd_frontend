import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Box } from "@chakra-ui/react";

import Navbar from "../components/Navbar";

// const RootContainer = styled.div`
//     height: 100vh;

//     display: flex;
//     flex-flow: column;
// `;

export default function Root() {
    return (
        <Box w={"full"} minH={"100vh"}>
            <Navbar />
            <Outlet />
        </Box>
    );
}
