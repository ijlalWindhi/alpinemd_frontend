import React from "react";
import {
    Box,
    Flex,
    Icon,
    Stack,
    Button,
    Text,
    useDisclosure,
    useColorMode,
    useColorModeValue,
    Image,
} from "@chakra-ui/react";
import { X, AlignRight, Sun, Moon } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_TOKEN } from "../utils/constants";
import { getLocalStorage } from "../utils/helper/localStorage";
import { checkLogged } from "../utils/constants";
import Logo from "../assets/alpinemd.svg";
import { useAuth } from "../contexts/auth-provider";

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const bg = useColorModeValue("black", "white");
    const color = useColorModeValue("white", "black");
    const [user, setUser] = React.useState("");
    const { login, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    React.useEffect(() => {
        const user = getLocalStorage(LOCAL_STORAGE_TOKEN);
        if (user) {
            setUser(user.decoded.id_token.name);
        }
    }, []);

    return (
        <>
            <Box
                display={"flex"}
                justifyContent={"space-around"}
                alignItems={"center"}
                py={4}
                px={{ base: 10, md: 10, lg: 16 }}
                boxShadow={"md"}
                zIndex={10}
            >
                <Flex
                    justifyContent={{ base: "space-between" }}
                    w={"full"}
                    my="auto"
                    alignItems={"center"}
                >
                    <Image src={Logo} alt="AlpineMD" w={20} />
                    <Icon
                        as={isOpen ? X : AlignRight}
                        onClick={isOpen ? onClose : onOpen}
                        display={{ md: "none" }}
                        w={6}
                        h={6}
                    />
                </Flex>
                <Box
                    w={"full"}
                    justifyContent={"right"}
                    display={{ base: "none", md: "flex" }}
                    alignItems={"center"}
                >
                    <Button
                        onClick={toggleColorMode}
                        variant={"ghost"}
                        colorScheme={"white"}
                        size={"sm"}
                        fontWeight={"normal"}
                        p={4}
                    >
                        <Icon
                            as={colorMode === "light" ? Moon : Sun}
                            w={6}
                            h={6}
                        />
                    </Button>
                    {checkLogged() ? (
                        <Flex alignItems={"center"} gap={5}>
                            <Text maxW={{ md: "100%", lg: "50%" }}>
                                Hello, {user}
                            </Text>
                            <Button
                                justifyContent={"center"}
                                color={color}
                                bg={bg}
                                rounded={"full"}
                                px={{ md: 6, lg: 10 }}
                                _hover={
                                    colorMode === "light"
                                        ? {
                                              bg: "blackAlpha.800",
                                              color: "white",
                                          }
                                        : {
                                              bg: "whiteAlpha.900",
                                              color: "black",
                                          }
                                }
                                onClick={() => handleLogout()}
                            >
                                <Text
                                    fontSize={{
                                        base: "lg",
                                        md: "sm",
                                        lg: "md",
                                    }}
                                    fontWeight={"normal"}
                                    cursor={"pointer"}
                                >
                                    Logout
                                </Text>
                            </Button>
                        </Flex>
                    ) : (
                        <Button
                            justifyContent={"center"}
                            color={color}
                            bg={bg}
                            rounded={"full"}
                            px={{ md: 4, lg: 10 }}
                            _hover={
                                colorMode === "light"
                                    ? {
                                          bg: "blackAlpha.800",
                                          color: "white",
                                      }
                                    : {
                                          bg: "whiteAlpha.900",
                                          color: "black",
                                      }
                            }
                            onClick={() => login()}
                        >
                            <Text
                                fontSize={{
                                    base: "lg",
                                    md: "sm",
                                    lg: "md",
                                }}
                                fontWeight={"normal"}
                                cursor={"pointer"}
                            >
                                Login/Register
                            </Text>
                        </Button>
                    )}
                </Box>
            </Box>
            {isOpen ? (
                <Box
                    py={4}
                    display={{ md: "none" }}
                    textAlign={"center"}
                    position={"absolute"}
                    w={"full"}
                    className={"glassmorphism"}
                    bg={bg}
                    color={color}
                >
                    <Stack as={"nav"} spacing={[4]}>
                        <Flex justifyContent={"center"}>
                            <Button
                                onClick={toggleColorMode}
                                variant={"ghost"}
                                colorScheme={"white"}
                                size={"sm"}
                                fontWeight={"normal"}
                                p={4}
                            >
                                <Icon
                                    as={colorMode === "light" ? Moon : Sun}
                                    w={6}
                                    h={6}
                                />
                            </Button>
                        </Flex>
                        <Flex justifyContent={"center"}>
                            {checkLogged() ? (
                                <Flex
                                    flexDir={"column"}
                                    alignItems={"center"}
                                    gap={5}
                                >
                                    <Text maxW={{ md: "100%", lg: "50%" }}>
                                        Hello, {user}
                                    </Text>
                                    <Button
                                        justifyContent={"center"}
                                        color={bg}
                                        bg={color}
                                        rounded={"full"}
                                        px={{ base: 10 }}
                                        _hover={
                                            colorMode === "light"
                                                ? {
                                                      bg: "whiteAlpha.900",
                                                      color: "black",
                                                  }
                                                : {
                                                      bg: "blackAlpha.700",
                                                      color: "white",
                                                  }
                                        }
                                        onClick={() => logout()}
                                    >
                                        <Text
                                            fontSize={{
                                                base: "lg",
                                                md: "sm",
                                                lg: "md",
                                            }}
                                            fontWeight={"normal"}
                                            cursor={"pointer"}
                                        >
                                            Logout
                                        </Text>
                                    </Button>
                                </Flex>
                            ) : (
                                <Button
                                    justifyContent={"center"}
                                    color={bg}
                                    bg={color}
                                    rounded={"full"}
                                    px={{ base: 10 }}
                                    _hover={
                                        colorMode === "light"
                                            ? {
                                                  bg: "whiteAlpha.900",
                                                  color: "black",
                                              }
                                            : {
                                                  bg: "blackAlpha.700",
                                                  color: "white",
                                              }
                                    }
                                    onClick={() => login()}
                                >
                                    <Text
                                        fontSize={{
                                            base: "lg",
                                            md: "sm",
                                            lg: "md",
                                        }}
                                        fontWeight={"normal"}
                                        cursor={"pointer"}
                                    >
                                        Login/Register
                                    </Text>
                                </Button>
                            )}
                        </Flex>
                    </Stack>
                </Box>
            ) : null}
        </>
    );
}
