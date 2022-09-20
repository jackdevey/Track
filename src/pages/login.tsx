import { Container, Card, Title, Text, Box, Anchor, ButtonProps, Button } from '@mantine/core';
import { useRouter } from 'next/router';
import { BrandGithub } from 'tabler-icons-react';
import { HeaderMiddle } from '../components/headerMiddle';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
    // Use router
    const router = useRouter();
    return <>
        {/* <HeaderMiddle/> */}
        <Container size="xs">
            <Box mt={50}>
                <Anchor onClick={()=> router.push("/")}>
                    ← Back
                </Anchor>
                <Title>
                    Login
                </Title>
            </Box>
            <Card withBorder my={20}>
            <Button
                onClick={() => signIn("github", { callbackUrl: "/" })}
                leftIcon={<BrandGithub size={16} />}
                sx={(theme) => ({
                backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
                color: '#fff',
                '&:hover': {
                    backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
                },
                })}>
                Login with GitHub
            </Button>
            </Card>
        </Container>
    </>
}