import nookies from 'nookies';
import { verifyIdToken } from "../firebaseAdmin";
import { auth } from "../firebaseClient";
import { Box, Flex, Text, Heading, Button, Link } from '@chakra-ui/react';

// Any page that requires a user to be logged in

function Authenticated({ session }) {
    if (session) {
        return (
            <Flex>
                {/* Home button */}
                <Link href="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                    <Button variant={"solid"} colorScheme="green">
                        Home
                    </Button>
                </Link>

                <Box w={500} p={4} my={12} mx="auto">
                    <Heading as={"h2"} mb={12} textAlign="center">
                        Authenticated
                    </Heading>
                    <Box>
                        <Text textAlign={"center"}>{session}</Text>
                        <Text textAlign={"center"} mt={8}>
                            You can do anything now that you are Authenticated
                        </Text>
                    </Box>
                    <Box my={12} mx="auto" width="500px">
                        <Button width="100%" variant="solid" colorScheme="red"
                            onClick={async () => {
                                await auth.signOut();
                                window.location.href = "/";
                            }}>Sign Out</Button>
                    </Box>
                </Box>
            </Flex>
        );
    } else {
        return (
            <Box>
                <Text>Loading</Text>
            </Box>
        );
    }
}

export async function getServerSideProps(context) {
    try {
        const cookies = nookies.get(context);
        const token = await verifyIdToken(cookies.token);
        const { uid, email } = token;
        return {
            props: {
                session: `Email: ${email} UID: ${uid}`
            },
        };
    } catch (error) {
        console.log(error);
        context.res.writeHead(302, { Locaiton: "/login" });
        context.res.end();
        return { props: {} };
    }
}

export default Authenticated;