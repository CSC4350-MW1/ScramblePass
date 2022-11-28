import { useState } from "react";
import firebaseClient from "../firebaseClient";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Box, Flex, Input, FormControl, FormLabel, FormHelperText, Stack, Button, Heading, useToast, Container, Image, HStack } from '@chakra-ui/react';

import { DndContext, closestCenter } from "@dnd-kit/core";
import { arraySwap, SortableContext, rectSwappingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "../component/sortableItem";
import { Grid } from "../component/Grid"

import passwordImagesJson from '../component/passwordImages.json';
import Link from "next/link";

export default function Login() {
    firebaseClient();
    const toast = useToast();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const [images, setImages] = useState(passwordImagesJson);
    const [initialImages, setInitialImages] = useState("");
    return (
        <Flex>
            {/* Home button */}
            <Link href="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                <Button variant={"solid"} colorScheme="green">
                    Home
                </Button>
            </Link>

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

                <Container centerContent w={262} bg="grey" my={2}>
                    <DndContext
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <Grid columns={3}>
                            <SortableContext
                                items={images}
                                strategy={rectSwappingStrategy}
                            >
                                {images.map((image, index) => <SortableItem key={image} id={image} index={index} />)}
                            </SortableContext>
                        </Grid>
                    </DndContext>
                </Container>

                <Stack spacing={4}></Stack>
                <Stack justify={"center"} mt={6} isInline spacing={10}>

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

    function handleDragEnd(event) {
        console.log("Drag End Called");
        const { active, over } = event;
        console.log("Active: " + active.id.match(/password[0-9]/));
        console.log("Over: " + over.id.match(/password[0-9]/));

        if (active.id !== over.id) {
            setImages((items) => {
                // Sets the useState of initialImages to the string of the original image order
                if (initialImages === "") {
                    setInitialImages(String(items).match(/password[0-9]/g));
                }
                const activeIndex = items.indexOf(active.id);
                const overIndex = items.indexOf(over.id);

                // Sets the image order equal to filename (password[0-9]) in the order the images are currenlty in
                const imageOrder = String(arraySwap(items, activeIndex, overIndex)).replace(',', '').match(/password[0-9]/g);
                console.log(String(imageOrder).replaceAll(',', ''));

                // Set the password to the image order
                setPass(String(imageOrder).replaceAll(',', ''));
                return arraySwap(items, activeIndex, overIndex);
            });
        }
    }
}