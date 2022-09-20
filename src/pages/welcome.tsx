import { Container, Card, Title, Text, Box, Anchor, ButtonProps, Button, Code } from '@mantine/core';
import { useRouter } from 'next/router';
import { BrandGithub, BrandGoogle } from 'tabler-icons-react';
import { HeaderMiddle } from '../components/headerMiddle';
import { signIn } from 'next-auth/react';

import { createStyles, Group } from '@mantine/core';

const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    boxSizing: 'border-box'
  },

  inner: {
    position: 'relative',
    paddingTop: 200,
    paddingBottom: 120,

    [BREAKPOINT]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },

  title: {
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,

    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: 24,

    [BREAKPOINT]: {
      fontSize: 18,
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 2,

    [BREAKPOINT]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: 54,


    [BREAKPOINT]: {
      height: 54,

      flex: 1,
    },
  },
}));

export default function Welcome() {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
        <Container size={700} className={classes.inner}>
            <h1 className={classes.title}>
                🚅 Track <Code style={{fontSize: 20}}>Alpha</Code>
            </h1>

            <Text className={classes.description} color="dimmed">
                Log, share &amp; compare your train sightings
            </Text>

            <Group className={classes.controls}>
            
                <Button
                    onClick={() => signIn("github", { callbackUrl: "/" })}
                    size="xl"
                    variant="default"
                    className={classes.control}
                    leftIcon={<BrandGithub/>}>
                    Continue with GitHub
                </Button>

                <Button
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    size="xl"
                    variant="default"
                    className={classes.control}
                    leftIcon={<BrandGoogle/>}>
                    Continue with Google
                </Button>

            </Group>

            <Group mt={20}>
                <Anchor>Privacy Policy</Anchor>
                <Anchor>Terms &amp; Conditions</Anchor>
                <Anchor href="https://github.com/jackdevey/track">Contribute</Anchor>
            </Group>
        </Container>
    </div>
  );
};