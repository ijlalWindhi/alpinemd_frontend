import { useDisclosure, Button } from "@chakra-ui/react";
import { Trash2 } from "react-feather";
import ModalDelete from "../ModalDelete";

export default function Delete({ reload, payload }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <ModalDelete
                isOpen={isOpen}
                onClose={onClose}
                payload={payload}
                reload={reload}
            />
            <Button
                variant="outline"
                colorScheme={"red"}
                fontWeight={"medium"}
                fontSize={"sm"}
                px={4}
                rounded={"md"}
                onClick={onOpen}
                leftIcon={<Trash2 />}
            >
                Delete
            </Button>
        </>
    );
}
