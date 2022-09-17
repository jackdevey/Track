import { Anchor, Box, Button, Card, Container, createStyles, Divider, Grid, SimpleGrid, Skeleton, Text, ThemeIcon, Title, useMantineTheme } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { ArrowRight, CircleCheck } from "tabler-icons-react";
import { HeaderMiddle } from "../components/headerMiddle";
import { trpc } from "../utils/trpc";

const PRIMARY_COL_HEIGHT = 300;

const Home: NextPage = () => {

    const { classes } = useStyles();
    const theme = useMantineTheme();
    const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;

    return (
        <>
            <HeaderMiddle/>

            <Box className={classes.header}>
                <Container>
                    <div className={classes.headerText}>
                        <Title>jackdevey</Title>
                        <Text>Level 4</Text>
                    </div>
                </Container>
            </Box>
      
            <Container my="md">
                <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                    <Card withBorder>
                        <Title order={3} mb={15}>Recent logs</Title>

                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <div>
                                <Title order={4}>350101</Title>
                                <Text>Monday 3rd September</Text>
                            </div>
                            <Anchor href={"/rs/350101"}>View</Anchor>
                        </div>
                        <Divider mt={10} mb={10}/>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <div>
                                <Title order={4}>170101</Title>
                                <Text>Tuesday 4th September</Text>
                            </div>
                            <Anchor href={"/rs/170101"}>View</Anchor>
                        </div>
                    </Card>
                    <Grid gutter="md">
                        <Grid.Col>
                            <Card withBorder>
                                hi
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Card withBorder>
                                hi
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Card withBorder>
                                hi
                            </Card>
                        </Grid.Col>
                    </Grid>
                </SimpleGrid>
            </Container>
        </>
  );
};

export default Home;

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