import { useState } from "react";
import firebaseClient from "../firebaseClient";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Box, Flex, Input, FormControl, FormLabel, FormHelperText, Stack, Button, Heading, useToast } from '@chakra-ui/react';

export default function Login() {
    firebaseClient();
    const toast = useToast();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    return (
        <Flex>
            <Box w={500} p={4} my={12} mx="auto">
                <Heading as={"h2"} textAlign="center">
                    Login
                </Heading>
                <FormControl isRequired>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <Input onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="emailAddress"
                        value={email}
                        aria-describedby="email-helper-text"
                    >
                    </Input>
                </FormControl>

                {/* Temporarily taking a password for testing purposes */}
                <FormControl isRequired>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input onChange={(e) => setPass(e.target.value)}
                        type="password"
                        id="pass"
                        value={pass}
                        aria-describedby="password-helper-text"
                    >
                    </Input>
                </FormControl>

                <Stack justify={"center"} mt={6} isInline spacing={10}>
                    <Button minWidth={"40%"} variant="solid"
                        colorScheme={"blue"} isDisabled={email === "" || pass === ""}
                        onClick={async () => {
                            await firebase.auth().createUserWithEmailAndPassword(email, pass).then(function () {
                                window.location.href = "/"
                            }).catch(function (error) {
                                const message = error.message;
                                toast({
                                    title: "An error occurred",
                                    description: message,
                                    status: "error",
                                    duration: 9000,
                                    isClosable: true,
                                })
                            })
                        }}>
                        Create Account
                    </Button>

                    <Button minWidth={"40%"} variant="solid"
                        colorScheme={"blue"} isDisabled={email === "" || pass === ""}
                        onClick={async () => {
                            await firebase.auth().signInWithEmailAndPassword(email, pass).then(function () {
                                window.location.href = "/"
                            }).catch(function (error) {
                                const message = error.message;
                                toast({
                                    title: "An error occurred",
                                    description: message,
                                    status: "error",
                                    duration: 9000,
                                    isClosable: true,
                                })
                            })
                        }}>
                        Login
                    </Button>
                </Stack>
            </Box>
        </Flex>
    )
}