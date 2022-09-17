import { Anchor, Avatar, BackgroundImage, Box, Breadcrumbs, Button, Card, Container, createStyles, Divider, Grid, LoadingOverlay, Space, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft, CircuitGroundDigital } from "tabler-icons-react";
import { HeaderMiddle } from "../../../components/headerMiddle";
import { trpc } from "../../../utils/trpc";

export default function RstockPage() {

    // Get identifier from router
    const router = useRouter();
    const { identifier } = router.query;

    // Get data about the train
    const { data, isLoading } = trpc.useQuery([
        "rstock.get",
        { identifier: identifier as string },
    ]);

    const { classes } = useStyles();

    if (!data) return <LoadingOverlay visible={true}></LoadingOverlay>

    return (
        <>
            <HeaderMiddle/>
            <Box className={classes.header}>
                <Container>
                    <div className={classes.headerText}>
                        <Title>{identifier}</Title>
                        <Text>{data.operator.name}</Text>
                    </div>
                </Container>
            </Box>
            <Container my={20}>
                <Grid>
                    <Grid.Col md={8}>
                        <Stack>
                            <Card withBorder>
                                <div className={classes.titleRow}>
                                    <Title order={4}>Formation</Title>
                                    <Text>{data.formation}</Text>
                                </div>
                                <Divider my={10}/>
                                <div className={classes.titleRow}>
                                    <Title order={4}>Carriages</Title>
                                    <Text>{data.carCount}</Text>
                                </div>
                                <Divider my={10}/>
                                <div className={classes.titleRow}>
                                    <Title order={4}>Operator</Title>
                                    <Anchor href={"/oc/" + data.operator.code} key={data.operatorId}>
                                        {data.operator.name}
                                    </Anchor>
                                </div>
                                <Divider my={10}/>
                                <div className={classes.titleRow}>
                                    <Title order={4}>Livery</Title>
                                    <Text>{data.livery}</Text>
                                </div>
                                <Divider my={10}/>
                                <div className={classes.titleRow}>
                                    <Title order={4}>Depot</Title>
                                    <Text>{data.depot}</Text>
                                </div>
                                <Divider my={10}/>
                                <div className={classes.titleRow}>
                                    <Title order={4}>Manufacturer</Title>

                                        <Anchor href={"/mf/" + data.class.manufacturerId} key={data.class.manufacturerId}>
                                            {data.class.manufacturer.name}
                                        </Anchor>
                                    
                                </div>
                                <Divider my={10}/>
                                <div className={classes.titleRow}>
                                    <Title order={4}>Built</Title>
                                    <Text>{data.builtYear}</Text>
                                </div>
                            </Card>
                            <Card withBorder>
                                <Title order={4}>Illustration</Title>
                                <img 
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/CrossCountry_Class_170-1-6.png/1920px-CrossCountry_Class_170-1-6.png"
                                    height="30"
                                    style={{marginTop: 10}}/>
                            </Card>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col md={4}>
                        <Card withBorder>
                            Logging stuff here
                        </Card>
                    </Grid.Col>
                </Grid>
            </Container>
        </>
    )
}

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