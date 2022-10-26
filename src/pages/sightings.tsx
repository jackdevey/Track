import { Anchor, Box, Card, Code, Container, createStyles, Divider, Grid, SimpleGrid, Skeleton, Text, ThemeIcon, Title, useMantineTheme } from "@mantine/core";
import type { GetServerSideProps } from "next";
import { User } from "next-auth";
import { useRouter } from "next/router";
import { Clock, Location } from "tabler-icons-react";
import { AuthGuardUI } from "../components/authGuard";
import { HeaderMiddle } from "../components/headerMiddle";
import { MainPageLoading, SubPageLoading } from "../components/mainPageLoading";
import SightingBlock from "../components/sightingCard";
import { trpc } from "../utils/trpc";

const PRIMARY_COL_HEIGHT = 300;

export default function Home({ user }: { user: User}) {

    const { classes } = useStyles();
    const theme = useMantineTheme();
    const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;
    const router = useRouter();

    // Get the list of sightings
    const { data, isLoading } = trpc.useQuery(["si.getAll", { take: 10}]);
    if (!data) return <SubPageLoading user={user}/>

    return (
        <>
            <HeaderMiddle user={user}/>

            <Box className={classes.header}>
                <Container>
                    <div className={classes.headerText}>
                        <Title>Your Sightings</Title>
                    </div>
                </Container>
            </Box>
      
            <Container my={20}>
                <Grid columns={12}>
                    <Grid.Col span={8}>
                        <Card withBorder shadow="sm">
                            {data.map((sighting: SightingForList, i: number) => (
                                <>
                                    <SightingBlock sighting={sighting} hasChips={true}/>
                                    {i != data.length - 1 && <Divider my={10}/>}
                                </>
                            ))}
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Card withBorder shadow="sm">
                            <Title order={4}>Your stats</Title>
                        </Card>
                    </Grid.Col>
                </Grid>
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