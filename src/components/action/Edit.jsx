import { useDisclosure, IconButton, Button } from "@chakra-ui/react";
import { Edit } from "react-feather";
import ModalDetailNotes from "../ModalDetailNotes";

export default function Delete({ reload, payload }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <ModalDetailNotes
                isOpen={isOpen}
                onClose={onClose}
                payload={payload}
                reload={reload}
            />
            <Button
                variant="outline"
                colorScheme={"blue"}
                fontWeight={"medium"}
                fontSize={"sm"}
                px={4}
                rounded={"md"}
                onClick={onOpen}
                leftIcon={<Edit />}
            >
                Edit
            </Button>
        </>
    );
}
