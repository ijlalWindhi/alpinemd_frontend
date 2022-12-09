import { useEffect, useState } from "react";
import Note from "../components/Note";
import {
    Button,
    useColorModeValue,
    Grid,
    Box,
    Text,
    GridItem,
    Center,
} from "@chakra-ui/react";
import { GetAllNotes } from "../components/ApiHandler.js";
import { Plus } from "react-feather";
import ModalAddNotes from "../components/ModalAddNotes";

export default function NoteList() {
    const [notes, setNotes] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);

    const bg = useColorModeValue("blackAlpha.800", "white");
    const color = useColorModeValue("white", "blackAlpha.800");
    const colorHover = useColorModeValue("blackAlpha.700 ", "whiteAlpha.900");

    const FetchAllNotes = async () => {
        GetAllNotes().then((res) => {
            setNotes(res.data);
        });
    };

    useEffect(() => {
        FetchAllNotes();
    }, []);

    return (
        <Box w={"full"} minH={"100vh"}>
            <ModalAddNotes
                isOpen={isOpen}
                onClose={onClose}
                reload={FetchAllNotes}
            />
            <Box
                display={"flex"}
                flexDir={{ base: "column", md: "row" }}
                gap={5}
                my={4}
                mx={10}
            >
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
            </Box>
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
                {notes === null ? (
                    <GridItem colSpan={4}>
                        <Center>
                            <Text
                                fontWeight={"semibold"}
                                fontSize={{ base: "lg", md: "xl" }}
                            >
                                Loading...
                            </Text>
                        </Center>
                    </GridItem>
                ) : notes.length >= 1 ? (
                    notes &&
                    notes.map((note, i) => (
                        <Note key={i} payload={note} reload={FetchAllNotes} />
                    ))
                ) : (
                    <GridItem colSpan={4}>
                        <Center>
                            <Text
                                fontWeight={"semibold"}
                                fontSize={{ base: "lg", md: "xl" }}
                            >
                                No Notes Found
                            </Text>
                        </Center>
                    </GridItem>
                )}
            </Grid>
        </Box>
    );
}
