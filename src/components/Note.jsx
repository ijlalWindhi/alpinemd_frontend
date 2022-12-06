import React, { useRef } from "react";
import { Box, Text, GridItem } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { motion } from "framer-motion";

export default function Note({ title, body }) {
    const scrollRef = useRef(null);
    return (
        <GridItem mx={"auto"} width={"80%"}>
            <Box
                bg={useColorModeValue("white", "gray.800")}
                border={useColorModeValue("2px solid #ddd", "1px solid #333")}
                rounded="lg"
                overflow="hidden"
                display={"flex"}
                flexDirection={"column"}
                px={6}
                py={4}
                _hover={{
                    border: useColorModeValue(
                        "2px solid #333",
                        "2px solid #ddd"
                    ),
                    cursor: "pointer",
                    transform: "scale(1.01)",
                    transition: "all 0.2s ease-in-out",
                    boxShadow: "lg",
                }}
                as={motion.div}
                whileInView={{ y: 0 }}
                initial={{ y: 50 }}
                ref={scrollRef}
            >
                <Text
                    fontWeight={"semibold"}
                    fontSize={{ base: "md", md: "lg" }}
                >
                    {title}
                </Text>
                <Text fontSize={{ base: "sm", md: "md" }}>{body}</Text>
            </Box>
        </GridItem>
    );
}
