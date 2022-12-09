import React, { useState, useEffect } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
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
import AlertNotification from "./Alert";
import { UpdateNotes } from "./ApiHandler";

export default function ModalDetailNotes({ isOpen, onClose, payload, reload }) {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            title: payload.title,
            note: payload.body,
        },
    });

    const submitHandler = async (values) => {
        setIsLoading(true);
        const res = await UpdateNotes(values, payload.id, reload);
        setMessage(res.message);
        setStatus(res.status);
        if (res.status === "success") {
            setTimeout(() => {
                onClose(), reload(), reset(), setStatus(""), setMessage("");
                setIsLoading(false);
            }, 1000);
        } else {
            setTimeout(() => {
                setStatus(""), setMessage(""), setIsLoading(false);
            }, 2000);
        }
    };

    const handleClose = () => {
        onClose();
        reset();
    };

    useEffect(() => {
        reset({
            title: payload.title,
            note: payload.body,
        });
    }, [payload, reset]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            blockScrollOnMount={false}
            motionPreset="scale"
            size="md"
        >
            <ModalOverlay />
            <ModalContent rounded={"lg"}>
                <ModalBody p={8}>
                    <Heading fontSize={"lg"} fontWeight={"semibold"}>
                        Detail Notes
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
                        <Flex justifyContent={"space-between"}>
                            <Button
                                variant="outline"
                                colorScheme={"red"}
                                fontWeight={"medium"}
                                fontSize={"sm"}
                                px={6}
                                rounded={"md"}
                                onClick={handleClose}
                            >
                                Cancle
                            </Button>
                            <Button
                                variant="outline"
                                colorScheme={"teal"}
                                fontWeight={"medium"}
                                fontSize={"sm"}
                                px={6}
                                rounded={"md"}
                                isLoading={isLoading}
                                onClick={handleSubmit(async (values) => {
                                    await submitHandler(values);
                                })}
                            >
                                Save Change
                            </Button>
                        </Flex>
                    </FormControl>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
