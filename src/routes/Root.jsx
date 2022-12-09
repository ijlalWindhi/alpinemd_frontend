import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

export default function Root() {
    return (
        <Box w={"full"} minH={"100vh"}>
            <Navbar />
            <Outlet />
        </Box>
    );
}
