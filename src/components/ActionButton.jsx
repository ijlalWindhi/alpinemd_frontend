import React from "react";
import { Flex } from "@chakra-ui/react";
import Delete from "./action/Delete";
import Edit from "./action/Edit";

export default function ActionButton({ reload, payload }) {
    return (
        <Flex dir="row" gap={3} mt={8}>
            <Delete reload={reload} payload={payload} />
            <Edit reload={reload} payload={payload} />
        </Flex>
    );
}
