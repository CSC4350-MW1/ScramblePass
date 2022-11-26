import { Flex } from "@chakra-ui/react";

export default function Container({ children }) {
    return (
        <>
            <Flex as={"main"} justifyContent={"center"} flexDirection={"column"} px={8}>
                {children}
            </Flex>
        </>
    );
}