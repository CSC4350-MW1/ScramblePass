import { useState } from "react";
import firebaseClient from "../firebaseClient";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Box, Flex, Input, FormControl, FormLabel, FormHelperText, Stack, Button, Heading, useToast, Container, SimpleGrid } from '@chakra-ui/react';

import { DndContext, closestCenter } from "@dnd-kit/core";
import { arraySwap, SortableContext, rectSwappingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "../component/sortableItem";

export default function Signup() {
    firebaseClient();
    const toast = useToast();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    // temporary array of strings to represent the images
    const [images, setImages] = useState(["image1", "image2", "image3", "image4", "image5", "image6", "image7", "image8", "image9"]);
    const [initalImages, setInitialImages] = useState("");

    return (
        <Flex>
            <Box w={500} p={4} my={12} mx="auto">
                <Heading as={"h2"} textAlign="center">
                    Signup
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

                <Container centerContent>
                    <SimpleGrid columns={3} spacing={2}>
                        <DndContext
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={images}
                                strategy={rectSwappingStrategy}
                            >
                                {images.map(image => <SortableItem key={image} id={image} />)}
                            </SortableContext>
                        </DndContext>
                    </SimpleGrid>
                </Container>

                <Stack justify={"center"} mt={6} isInline spacing={10}>
                    <Button minWidth={"40%"} variant="solid"
                        // isDisabled checks to see if the images have not moved by seeing if the initial state is still and empty 
                        // string and seeing if the currect password is the same as the initial image order
                        colorScheme={"blue"} isDisabled={email === "" || pass === "" || initalImages === "" || pass === initalImages}
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
                </Stack>
            </Box>
        </Flex>

    )
    // Functions for draggables
    function handleDragEnd(event) {
        console.log("Drag End Called");
        const { active, over } = event;
        console.log("Active: " + active.id);
        console.log("Over: " + over.id);

        if (active.id !== over.id) {
            setImages((items) => {
                // Sets the useState of initialImages to the string of the original image order
                if (initalImages === "") {
                    setInitialImages(String(items).replaceAll(',', ''));
                }
                const activeIndex = items.indexOf(active.id);
                const overIndex = items.indexOf(over.id);

                console.log("Array Swap: " + arraySwap(items, activeIndex, overIndex));
                const imageOrder = String(arraySwap(items, activeIndex, overIndex)).replaceAll(',', '');
                // Set the password to the image id order
                setPass(imageOrder);
                return arraySwap(items, activeIndex, overIndex);
            });
        }
    }
}