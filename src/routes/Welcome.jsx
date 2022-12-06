import logo from "../assets/alpinemd.svg";
import {
    Container,
    Center,
    Grid,
    GridItem,
    Image,
    Heading,
    Text,
    Button,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/auth-provider";

export default function Welcome() {
    const { colorMode, toggleColorMode } = useColorMode();
    const bg = useColorModeValue("gray.800", "white");
    const color = useColorModeValue("white", "gray.800");
    const { login } = useAuth();
    return (
        <Container maxW="80%" gridTemplateRows="repeat(2, 1fr)" py={14} p={0}>
            <Center>
                <Grid
                    gap={{ base: "5", lg: "90" }}
                    h="90vh"
                    w="base: 100%"
                    templateColumns={{ lg: "repeat(2, 1fr)" }}
                    justifyContent="center"
                >
                    <GridItem margin={{ base: "auto", lg: "auto 0" }}>
                        <Heading
                            as={motion.h1}
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 3 }}
                            fontSize={{ base: "3xl", md: "5xl" }}
                        >
                            Welcome to AlpineMd
                        </Heading>
                        <Text
                            fontSize={{ base: "lg", lg: "2xl" }}
                            maxW={"80%"}
                            fontWeight={"medium"}
                            my={5}
                            as={motion.h1}
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 3 }}
                        >
                            The world's most loved social storytelling platform
                        </Text>
                        <Text
                            fontSize={{ base: "sm", md: "lg" }}
                            fontWeight={"light"}
                            as={motion.h1}
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 3 }}
                        >
                            Wattpad connects a global community of 90 million
                            readers and writers through the power of stories.
                        </Text>
                        <Button
                            bg={bg}
                            color={color}
                            justifyContent={"center"}
                            rounded={"full"}
                            px={{ base: 10, md: 6, lg: 20 }}
                            py={4}
                            mt={5}
                            _hover={{
                                bg:
                                    colorMode === "light"
                                        ? "gray.700"
                                        : "whiteAlpha.800",
                            }}
                            as={motion.button}
                            whileHover={{ scale: 1.02 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0 }}
                            onClick={() => login()}
                        >
                            <Text
                                fontSize={{
                                    base: "lg",
                                    md: "md",
                                    lg: "2xl",
                                }}
                                fontWeight={"bold"}
                                cursor={"pointer"}
                            >
                                Login/Register
                            </Text>
                        </Button>
                    </GridItem>
                    <GridItem margin={{ base: "5", lg: "auto 0" }}>
                        <Center>
                            <Image
                                src={logo}
                                width={{
                                    base: "100%",
                                    sm: "45",
                                    md: "40vw",
                                    lg: "33vw",
                                }}
                                draggable={false}
                                as={motion.img}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 3 }}
                            />
                        </Center>
                    </GridItem>
                </Grid>
            </Center>
        </Container>
    );
}
