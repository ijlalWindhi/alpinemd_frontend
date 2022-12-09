import React, { useRef } from "react";
import { Box, Text, GridItem } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { motion } from "framer-motion";
import ActionButton from "./ActionButton";

export default function Note({ reload, payload }) {
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
                    fontSize={{ base: "lg", md: "xl" }}
                    mb={2}
                >
                    {payload.title}
                </Text>
                <Text fontSize={{ base: "sm", md: "md" }}>{payload.body}</Text>
                <ActionButton reload={reload} payload={payload} />
            </Box>
        </GridItem>
    );
}
