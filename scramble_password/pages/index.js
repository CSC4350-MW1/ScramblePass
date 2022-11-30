import { useAuth } from "./../auth";
import Container from "../component/Container";
import { Flex, Box, Button, Text, Heading, Stack, Link, LinkBox } from "@chakra-ui/react";

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

            <Link href="/signup" width={"100%"} style={{ color: 'inherit', textDecoration: 'inherit' }}>
              <Button variant={"solid"} colorScheme="green" width={"100%"} isDisabled={user}>
                Sign Up
              </Button>
            </Link>

            <Link href="/login" width={"100%"} style={{ color: 'inherit', textDecoration: 'inherit' }}>
              <Button variant={"solid"} colorScheme="green" width={"100%"} isDisabled={user}>
                Login
              </Button>
            </Link>
          </Stack>

          {/* Going to areas of website locked via authentication */}
          <Link href="/authenticated" style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <Button my={2} variant={"solid"} colorScheme="blue" width={"100%"} isDisabled={!user}>
              Go to Authenticated Route
            </Button>
          </Link>

        </Box>
      </Flex>
    </Container>
  );
}
