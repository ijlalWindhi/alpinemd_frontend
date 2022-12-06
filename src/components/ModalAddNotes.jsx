import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Grid,
    Container,
    FormControl,
    Input,
    Button,
    Heading,
    FormHelperText,
    Box,
    Flex,
    Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
// import { PostProducts } from "../ApiHandler";
import AlertNotification from "./Alert";

export default function ModalAddNotes(value) {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const submitHandler = async (values) => {
        setIsLoading(!isLoading);
        // const res = await PostProducts(values);
        // setMessage(res.message);
        // setStatus(res.status);
        // if (res.status === "success") {
        //     setTimeout(() => {
        //         value.onClose(),
        //             value.reload(),
        //             reset(),
        //             setStatus(""),
        //             setMessage("");
        //         setIsLoading(false);
        //     }, 1000);
        //     return;
        // } else {
        //     setTimeout(() => {
        //         setStatus(""), setMessage(""), setIsLoading(false);
        //     }, 2000);
        // }
    };

    const handleClose = () => {
        value.onClose();
        reset();
    };

    return (
        <Modal
            onClose={value.onClose}
            isOpen={value.isOpen}
            isCentered
            blockScrollOnMount={false}
            motionPreset="scale"
            size="md"
        >
            <ModalOverlay />
            <ModalContent rounded={"lg"}>
                <ModalBody p={8}>
                    <Heading fontSize={"lg"} fontWeight={"semibold"}>
                        Add New Note
                    </Heading>
                    <Box mt={4}>
                        <AlertNotification status={status} message={message} />
                    </Box>
                    <FormControl method="POST">
                        <Container
                            gridTemplateRows="repeat(2,1fr)"
                            p={0}
                            my={6}
                        >
                            <Flex direction="column" my={4}>
                                <Input
                                    type="text"
                                    name="title"
                                    id="title"
                                    rounded={"md"}
                                    focusBorderColor="teal.500"
                                    placeholder="Title"
                                    fontSize={"sm"}
                                    {...register("title", {
                                        required: true,
                                    })}
                                />
                                {errors.title?.type === "required" && (
                                    <FormHelperText textColor="red" mb={4}>
                                        Add title
                                    </FormHelperText>
                                )}
                            </Flex>
                            <Flex direction="column" my={4}>
                                <Textarea
                                    type="text"
                                    name="note"
                                    id="note"
                                    rounded={"md"}
                                    fontSize={"sm"}
                                    focusBorderColor="teal.500"
                                    placeholder="Write your notes here"
                                    {...register("note", {
                                        required: true,
                                    })}
                                />
                                {errors.note?.type === "required" && (
                                    <FormHelperText textColor="red" mb={4}>
                                        Add Notes
                                    </FormHelperText>
                                )}
                            </Flex>
                        </Container>
                        <Button
                            variant="outline"
                            colorScheme={"teal"}
                            fontWeight={"medium"}
                            fontSize={"sm"}
                            px={6}
                            rounded={"md"}
                            onClick={handleClose}
                        >
                            Cancle
                        </Button>
                        <Button
                            type="submit"
                            ml={4}
                            px={6}
                            colorScheme={"teal"}
                            rounded={"md"}
                            fontWeight={"medium"}
                            fontSize={"sm"}
                            onClick={handleSubmit(async (values) => {
                                await submitHandler(values);
                            })}
                            isLoading={isLoading}
                        >
                            Add
                        </Button>
                    </FormControl>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
