import styled from "styled-components";
import { useAuth } from "../contexts/auth-provider";
import { useEffect, useState } from "react";
import Note from "../components/Note";
import { Link, useNavigate } from "react-router-dom";
import { checkLogged } from "../utils/constants";
import { Button, useColorModeValue, Grid, Box } from "@chakra-ui/react";
import { Plus, Trash2, X } from "react-feather";
import ModalAddNotes from "../components/ModalAddNotes";

const Container = styled.div`
    flex-grow: 1;
    display: flex;
    flex-flow: column;
`;

const ListControlsContainer = styled.div`
    display: flex;
    gap: 0.8rem;
    padding: 0.5rem;
    border-bottom: solid 1px #ddd;
    padding-left: 1.5rem;
`;

const NotesWrapper = styled.div`
    flex-grow: 1;
    padding: 1.5rem;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: min-content;
    gap: 1.5rem;

    & .new-note-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;

        padding: 1.5rem;
        border: solid 1px #ddd;
        border-radius: 16px;

        font-size: large;

        color: black;
        text-decoration: none;
    }
`;

const ControlLink = styled(Link)`
    padding: 0.3rem 0.4rem;
    display: flex;
    gap: 0.2rem;
    border-radius: 6px;
    border: solid 1px #ddd;
    text-decoration: none;
    color: black;
`;

const ControlButton = styled.button`
    padding: 0.3rem 0.4rem;
    display: flex;
    gap: 0.3rem;
    border-radius: 6px;
    border: solid 1px ${(props) => (props.active ? "red" : "#ddd")};
    text-decoration: none;
    color: ${(props) => (props.active ? "red" : "black")};
    font-size: inherit;
    background-color: white;
    cursor: pointer;

    & i {
        color: ${(props) => (props.active ? "red" : "black")};
    }
`;

export default function NoteList() {
    const { isAuthenticated, getAccessToken } = useAuth();

    const [notes, setNotes] = useState(null);
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);

    const bg = useColorModeValue("blackAlpha.800", "white");
    const color = useColorModeValue("white", "blackAlpha.800");
    const colorHover = useColorModeValue("blackAlpha.700 ", "whiteAlpha.900");
    const colorButton = useColorModeValue("red.500", "red.300");
    const colorButtonHover = useColorModeValue("red.600", "red.400");

    useEffect(() => {
        const getUserNotes = async () => {
            try {
                const accessToken = await getAccessToken({
                    audience: "https://alpinemd.com/",
                    scope: "read:notes",
                });

                const notesByUrl = "http://localhost:8080/notes";

                const notesResponse = await fetch(notesByUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const notes = await notesResponse.json();

                setNotes(notes);
            } catch (e) {
                console.error(e.message);
            }
        };

        if (isAuthenticated) getUserNotes();
    }, [getAccessToken, isAuthenticated]);

    // const navigate = useNavigate();
    // // check if user is logged in
    // useEffect(() => {
    //     const isLoggedIn = checkLogged();
    //     if (isLoggedIn) {
    //         navigate("/");
    //     }
    // }, [navigate]);

    return (
        <Box w={"full"} minH={"100vh"}>
            <ModalAddNotes isOpen={isOpen} onClose={onClose} />
            <ListControlsContainer>
                <Button
                    leftIcon={<Plus />}
                    px={5}
                    bg={bg}
                    color={color}
                    rounded={"full"}
                    _hover={{
                        bg: colorHover,
                    }}
                    onClick={() => {
                        setIsOpen(true);
                    }}
                >
                    New Note
                </Button>
                <Button
                    leftIcon={isDeleteMode ? <X /> : <Trash2 />}
                    px={5}
                    borderColor={isDeleteMode ? colorButton : bg}
                    color={isDeleteMode ? colorButton : bg}
                    rounded={"full"}
                    onClick={() => setIsDeleteMode(!isDeleteMode)}
                    active={isDeleteMode}
                    variant={"outline"}
                    _hover={{
                        bg: isDeleteMode ? colorButtonHover : bg,
                        color: isDeleteMode ? "white" : color,
                    }}
                >
                    Delete Note
                </Button>
            </ListControlsContainer>
            {/* <NotesWrapper>
                {isAuthenticated &&
                    notes &&
                    notes.map((note, i) => (
                        <Note title={note.title} body={note.body} key={i} />
                    ))}
            </NotesWrapper> */}
            <Grid
                templateColumns={{
                    base: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                }}
                gap={{ base: 4, md: 6 }}
                mt={8}
            >
                <Note title={"note1"} body={"body1"} key={1} />
                <Note title={"note1"} body={"body1"} key={1} />
                <Note title={"note1"} body={"body1"} key={1} />
                <Note title={"note1"} body={"body1"} key={1} />
                <Note title={"note1"} body={"body1"} key={1} />
            </Grid>
        </Box>
    );
}
