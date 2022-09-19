import { Anchor, Tooltip, BackgroundImage, Box, Breadcrumbs, Button, Card, Container, createStyles, Divider, Grid, LoadingOverlay, Space, Stack, Text, Title } from "@mantine/core";
import { Illustration } from "@prisma/client";
import Head from "next/head";
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
    const { data, isLoading } = trpc.useQuery(["rs.get", { identifier: "350101" }]);

    const { classes } = useStyles();

    if (!data) return <LoadingOverlay visible={true}></LoadingOverlay>

    return (
        <>
            <Head>
                <title>350101</title>
            </Head>
            <HeaderMiddle/>
            <Box className={classes.header}>
                <Container>
                    <div className={classes.headerText}>
                        <Title>{identifier}</Title>
                        <Text>Passenger train ({data.opSet.class.type})</Text>
                    </div>
                </Container>
            </Box>
            <Container my={20}>
                <Grid>
                    <Grid.Col md={8}>
                        <Stack>
                            <Card withBorder>
                                <div className={classes.titleRow}>
                                    <Text><b>Formation</b></Text>
                                    <Text>{data.formation}</Text>
                                </div>
                                <Divider my={10}/>
                                <div className={classes.titleRow}>
                                    <Text><b>Carriages</b></Text>
                                    <Text>{data.carCount}</Text>
                                </div>
                                <Divider my={10}/>
                                <div className={classes.titleRow}>
                                    <Text><b>Operator</b></Text>
                                    <Anchor href={"/oc/" + data.opSet.operator.code} key={data.opSet.operatorId}>
                                        {data.opSet.operator.name}
                                    </Anchor>
                                </div>
                                <Divider my={10}/>
                                <div className={classes.titleRow}>
                                    <Text><b>Livery</b></Text>
                                    <Text>{data.livery}</Text>
                                </div>
                                <Divider my={10}/>
                                <div className={classes.titleRow}>
                                    <Text><b>Depot</b></Text>
                                    <Text>{data.depot}</Text>
                                </div>
                                <Divider my={10}/>
                                <div className={classes.titleRow}>
                                    <Text><b>Manufacturer</b></Text>
                                    <Anchor href={"/mf/" + data.opSet.class.manufacturerId} key={data.opSet.class.manufacturerId}>
                                        {data.opSet.class.manufacturer.name}
                                    </Anchor>
                                </div>
                                <Divider my={10}/>
                                <div className={classes.titleRow}>
                                    <Text><b>Built</b></Text>
                                    <Text>{data.builtYear}</Text>
                                </div>
                            </Card>
                            <Card withBorder>
                                <Text><b>Illustrations</b></Text>
                                {data.opSet.illustrations.map((illustration: Illustration, i: number) => (
                                    <>
                                        <Tooltip 
                                            label={"By " + illustration.author + ", " + illustration.license}
                                            color="dark"
                                            offset={-10}
                                            withArrow>
                                                <Anchor href={illustration.source}>
                                                    <img 
                                                        src={illustration.url}
                                                        height="30px"
                                                        style={{marginTop: 10}}/>
                                                </Anchor>
                                        </Tooltip>
                                        {i != data.opSet.illustrations.length - 1 && <Divider my={10}/>}
                                    </>
                                ))}
                                
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