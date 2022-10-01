import { Anchor, Box, Card, Container, createStyles, Divider, Grid, SimpleGrid, Skeleton, Text, ThemeIcon, Title, useMantineTheme } from "@mantine/core";
import type { GetServerSideProps } from "next";
import { User } from "next-auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { AuthGuardUI } from "../components/authGuard";
import { HeaderMiddle } from "../components/headerMiddle";

const PRIMARY_COL_HEIGHT = 300;

export default function Account({ user }: { user: User}) {

    const { classes } = useStyles();
    const theme = useMantineTheme();
    const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Your Account</title>
            </Head>
            <HeaderMiddle user={user}/>

            <Box className={classes.header}>
                <Container>
                    <div className={classes.headerText}>
                        <Title>{user.name}</Title>
                        <Text>{user.email}</Text> 
                    </div>
                </Container>
            </Box>

            <Container my={20}>
                Account page
            </Container>
        </>
  );
};

const useStyles = createStyles((theme) => ({
  header: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark![6] : theme.colors.gray![0],
      borderBottom: `1px solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark![5] : theme.colors.gray![2]
      }`,
  },

  headerText: {
      paddingTop: 50,
      paddingBottom: 40,
  },

  titleRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      [theme.fn.smallerThan('sm')]: {
        justifyContent: 'flex-start',
      },
    },
}));

// Use authGuard for UI
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    return await AuthGuardUI(req, res);
};