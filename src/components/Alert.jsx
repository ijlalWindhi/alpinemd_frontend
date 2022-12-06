import React from "react";
import { Alert, AlertIcon } from "@chakra-ui/react";

export default function AlertNotification(props) {
    if (props.status === "success") {
        return (
            <Alert
                status={props.status}
                variant="left-accent"
                borderRadius={"md"}
            >
                <AlertIcon />
                {props.message}
            </Alert>
        );
    } else if (props.status === "error") {
        return (
            <Alert
                status={props.status}
                variant="left-accent"
                borderRadius={"md"}
            >
                <AlertIcon />
                {props.message}
            </Alert>
        );
    }
}
