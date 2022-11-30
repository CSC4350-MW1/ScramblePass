import { useState } from "react";
import { useAuth } from "./../auth";
import { auth, firestore } from '../firebaseClient';
import { Box, Flex, Input, FormControl, FormLabel, Link, Stack, Button, Heading, useToast, Container, Image, HStack } from '@chakra-ui/react';

import { DndContext, closestCenter } from "@dnd-kit/core";
import { arraySwap, SortableContext, rectSwappingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "../component/sortableItem";
import { Grid } from "../component/Grid"

import passwordImagesJson from '../component/passwordImages.json';
import passwordImagesJson2 from '../component/passwordImages2.json';

export default function Signup() {
    var { user } = useAuth();

    const toast = useToast();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const [images, setImages] = useState(passwordImagesJson);
    const [initialImages, setInitialImages] = useState("");
    const [imageSelected, setimageSelected] = useState("GSU");
    const [imageComment, setimageComment] = useState("Got school spirit, eh?")

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

                <center>
                    <h2>Select an Image</h2>
                </center>
                <Container centerContent w={500} my={2}>
                    <Grid columns={2}>
                        <img id="PantherSquare" onClick={() => {
                            setImages(passwordImagesJson);
                            setimageSelected("Panther");
                            setimageComment("Got school spirit, eh?");
                            console.log("Image selected. Loading Images now.");
                        }} height={"250"} width={"250"} src="https://firebasestorage.googleapis.com/v0/b/scrambler-pass.appspot.com/o/images%2FpanthersSquare.png?alt=media&token=2245ca32-1b9f-46e9-8715-380b78717103"></img>

                        <img id="LakeSquare" onClick={() => {
                            setImages(passwordImagesJson2);
                            setimageSelected("Lake");
                            setimageComment("I live scenic photos too!");
                            console.log("Image selected. Loading Images now.");
                        }} height={"250"} width={"250"} src="https://firebasestorage.googleapis.com/v0/b/scrambler-pass.appspot.com/o/images%2FLakeSquare.jpeg?alt=media&token=9865cb3a-c2e7-4f89-b969-cba971dd6916"></img>
                    </Grid>
                </Container>

                <center><text>{imageSelected} <br /> {imageComment}</text></center>

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

                <Stack justify={"center"} mt={6} isInline spacing={10}>
                    <Button minWidth={"40%"} variant="solid"

                        // isDisabled checks to see if the images have not moved by seeing if the initial state is still and empty 
                        // string and seeing if the currect password is the same as the initial image order
                        colorScheme={"blue"} isDisabled={email === "" || pass === "" || initialImages === "" || pass === initialImages}
                        onClick={async () => {
                            await auth.createUserWithEmailAndPassword(email, pass)
                                .then(async () => {
                                    // Make sure that the user is the newly created user
                                    user = auth.currentUser;

                                    // Reference the users and email document
                                    // const userDoc = firestore.doc(`users/${user.uid}`);
                                    const emailDoc = firestore.doc(`email/${email}`);

                                    // Commit user and email doc via a batch write
                                    const batch = firestore.batch();
                                    // batch.set(userDoc, { imageSelected: imageSelected });
                                    batch.set(emailDoc, { uid: user.uid, imageSelected: imageSelected });

                                    await batch.commit();
                                }).then(function () {
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
        </Flex >

    )
    // Functions for draggables
    function handleDragEnd(event) {
        console.log("Drag End Called");
        const { active, over } = event;
        console.log("Active: " + active.id.match(/password[0-9]/));
        console.log("Over: " + over.id.match(/password[0-9]/));

        if (active.id !== over.id) {
            setImages((items) => {
                // Sets the useState of initialImages to the string of the original image order
                if (initialImages === "") {
                    const initImageWComma = String(items).match(/password[0-9]/g)
                    setInitialImages(String(initImageWComma).replaceAll(',', ''));
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