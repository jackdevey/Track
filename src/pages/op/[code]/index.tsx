import { Anchor, Tooltip, BackgroundImage, Box, Breadcrumbs, Button, Card, Container, createStyles, Divider, Grid, LoadingOverlay, Space, Stack, Text, Title, Image, Skeleton, Alert, Avatar } from "@mantine/core";
import { Illustration, OperatorSet } from "@prisma/client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft, CircuitGroundDigital, InfoCircle } from "tabler-icons-react";
import { OperatorSetThumbnail } from "../../../components/classList/operatorCard";
import { HeaderMiddle } from "../../../components/headerMiddle";
import { trpc } from "../../../utils/trpc";

export default function RstockPage() {

    // Get code from router
    const router = useRouter();
    const { code } = router.query;

    const { data, isLoading } = trpc.useQuery([
        "op.get",
        { code: "lml" },
    ]);

    const { classes } = useStyles();

    if (!data) return <LoadingOverlay visible={true}></LoadingOverlay>

    return (
        <>
            <Head><title>{data.name}</title></Head>
            <HeaderMiddle/>
            <Box className={classes.header}>
                <Container>
                    <div className={classes.headerText}>
                        <Title>{data.name}</Title>
                        <Text>Operator</Text>
                    </div>
                </Container>
            </Box>
            <Container my={20}>
                <Grid>
                    <Grid.Col md={9}>
                        <Stack>
                            {(data.code == "lml" || data.code == "lmw") && <Alert icon={<InfoCircle/>}>{data.name} is a trading name for West Midlands Trains, who operate <Anchor href="/oc/lmw">West Midlands Railway</Anchor> &amp; <Anchor href="/oc/lml">London Northwestern Railway</Anchor></Alert>}
                            <Card withBorder>
                                <div className={classes.titleRow}>
                                    <Text><b>Franchise</b></Text>
                                    <Text>{data.franchise}</Text>
                                </div>
                                <Divider my={10}/>
                                <div className={classes.titleRow}>
                                    <Text><b>Reporting mark</b></Text>
                                    <Text>{data.code.substring(0, 2)}</Text>
                                </div>
                                <Divider my={10}/>
                                <div className={classes.titleRow}>
                                    <Text><b>Website</b></Text>
                                    <Anchor href={"https://" + data.website}>{data.website}</Anchor>
                                </div>
                                <Divider my={10}/>
                                <div className={classes.titleRow}>
                                    <Text><b>Calling stations</b></Text>
                                    <Text>{data.callStatCount}</Text>
                                </div>
                            </Card>
                            <Title order={4}>Rolling Stock</Title>
                            <Card withBorder>
                                {data.operatorSets.map((operatorSet: OperatorSet, i: number) => (
                                    <>
                                        <OperatorSetThumbnail opSet={operatorSet} operator={data}/>
                                        {data.operatorSets.length - 1 != i && <Divider my={10}/>}
                                    </>
                                ))}                     
                            </Card>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col md={3}>
                        <Card withBorder>
                        <Card.Section>
                            <Image src={data.logoUrl}/>
                        </Card.Section>
                            <Text mt={15}><b>Logo</b></Text>
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