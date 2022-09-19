import { Anchor, Tooltip, BackgroundImage, Box, Breadcrumbs, Button, Card, Container, createStyles, Divider, Grid, LoadingOverlay, Space, Stack, Text, Title, Image, Skeleton, Alert, Avatar } from "@mantine/core";
import { Illustration, OperatorSet, RStock } from "@prisma/client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft, CircuitGroundDigital, InfoCircle } from "tabler-icons-react";
import { OperatorSetThumbnail } from "../../../../components/classList/operatorCard";
import { HeaderMiddle } from "../../../../components/headerMiddle";
import { trpc } from "../../../../utils/trpc";

export default function RstockPage() {

    // Get code from router
    const router = useRouter();
    const { code, classNo } = router.query;

    const { data, isLoading } = trpc.useQuery([
        "os.get",
        { opCode: code as string, classNo: classNo as string },
    ]);

    const { classes } = useStyles();

    if (!data) return <LoadingOverlay visible={true}></LoadingOverlay>

    return (
        <>
            <Head><title>{data.operator.name}</title></Head>
            <HeaderMiddle/>
            <Box className={classes.header}>
                <Container>
                    <div className={classes.headerText}>
                        <Title>{data.operator.shortName}'s class {classNo}s</Title>
                        <Text>Operator Set</Text>
                    </div>
                </Container>
            </Box>
            <Container my={20}>
                <Grid>
                    <Grid.Col md={9}>
                        <Stack>
                            <Card withBorder>
                                <div className={classes.titleRow}>
                                    <Text><b>Operator</b></Text>
                                    <Anchor href={"/op/" + data.operator.code}>{data.operator.name}</Anchor>
                                </div>
                                <Divider my={10}/>
                                <div className={classes.titleRow}>
                                    <Text><b>Manufacturer</b></Text>
                                    <Anchor href={"/mf/" + data.class.manufacturer.id}>{data.class.manufacturer.name}</Anchor>
                                </div>
                                <Divider my={10}/>
                                <div className={classes.titleRow}>
                                    <Text><b>Count</b></Text>
                                    <Text>{data.rstock.length}</Text>
                                </div>
                            </Card>
                            <Title order={4}>Rolling Stock</Title>
                            <Card withBorder>
                                {data.rstock.map((rstock: RStock, i: number) => (
                                    <>
                                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                            <div>
                                                <Title order={4}>{rstock.identifier}</Title>
                                                <Text mt={-5}>{rstock.formation}</Text>
                                            </div>
                                            <Anchor href={"/rs/" + rstock.identifier}>View</Anchor>
                                        </div>
                                        {i != data.rstock.length - 1 && <Divider my={10}/>}
                                    </>
                                ))}          
                            </Card>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col md={3}>
                        <Card withBorder>
                        <Card.Section>
                            <Image src={data.operator.logoUrl}/>
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