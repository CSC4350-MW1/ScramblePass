import Link from "next/link";
import { useAuth } from "./../auth";
import Container from "../component/Container";
import { Flex, Box, Button, Text, Heading, Stack } from "@chakra-ui/react";
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";

export default function Home() {
  const { user } = useAuth();

  return (
    <Container>
      <Flex>
        <Box w={500} p={4} my={12} mx="auto">
          <Heading as={"h2"} textAlign="center">
            Welcome to the home page.
          </Heading>
          <Text mt={8} textAlign="center">
            {`User ID: ${user ? user.uid : "No user signed in"}`}
          </Text>
          <Stack mt={8} alignItems="center" justifyContent={"center"} isInline width={"100%"}>

            {/* Going to areas of website locked via authentication */}
            <Button variant={"solid"} colorScheme="blue" width={"100%"} isDisabled={!user}>
              <Link href="authenticated" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                Go to Authenticated Route
              </Link>
            </Button>

            {/* Sign Out of session on main page */}
            {/* If you want to enable then uncomment the firebase imports */}

            {/* <Button width={"100%"} variant="solid" colorScheme={"red"}
              onClick={async () => {
                await firebase.auth().signOut();
                // window.location.href = "/";
              }}>Sign Out</Button> */}

            <Button variant={"solid"} colorScheme="green" width={"100%"} isDisabled={user}>
              <Link href="/login" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                Login
              </Link>
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Container>
  );
}
