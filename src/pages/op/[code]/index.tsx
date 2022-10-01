import { Anchor, Tooltip, BackgroundImage, Box, Breadcrumbs, Button, Card, Container, createStyles, Divider, Grid, LoadingOverlay, Space, Stack, Text, Title, Image, Skeleton, Alert, Avatar } from "@mantine/core";
import { Illustration, OperatorSet } from "@prisma/client";
import { GetServerSideProps } from "next";
import { User } from "next-auth";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft, CircuitGroundDigital, InfoCircle } from "tabler-icons-react";
import { AttributePoint } from "../../../components/attributePoint";
import { AuthGuardUI } from "../../../components/authGuard";
import { OperatorSetThumbnail } from "../../../components/classList/operatorCard";
import { HeaderMiddle } from "../../../components/headerMiddle";
import { MainPageLoading } from "../../../components/mainPageLoading";
import { trpc } from "../../../utils/trpc";

export default function OP({ user }: { user: User}) {

    // Get code from router
    const router = useRouter();
    const { code } = router.query;

    const { data, isLoading } = trpc.useQuery([
        "op.get",
        { code: code as string },
    ]);

    const { classes } = useStyles();

    if (!data) return <MainPageLoading user={user}/>

    return (
        <>
            <Head><title>{data.name}</title></Head>
            <HeaderMiddle user={user}/>
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
                            {(data.code == "lml" || data.code == "lmw") && <Alert icon={<InfoCircle/>}>{data.name} is a trading name for West Midlands Trains, who operate <Anchor onClick={() => router.push(`/op/lmw`)}>West Midlands Railway</Anchor> &amp; <Anchor onClick={() => router.push(`/op/lml`)}>London Northwestern Railway</Anchor></Alert>}
                            <Card withBorder shadow="sm">                               
                                <AttributePoint
                                    name="Franchise"
                                    value={data.franchise}/>
                                <Divider my={10}/>
                                <AttributePoint
                                    name="Reporting mark"
                                    value={data.code.substring(0,2)}/>
                                <Divider my={10}/>
                                <AttributePoint
                                    name="Website"
                                    value={data.website}
                                    href={"https://" + data.website}/>
                                
                                <Divider my={10}/>
                                <AttributePoint
                                    name="Calling stations"
                                    value={data.callStatCount}/>
                            </Card>
                            <Title order={4}>Rolling Stock</Title>
                            <Card withBorder shadow="sm">
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
                        <Card withBorder shadow="sm">
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

// Use authGuard for UI
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    return await AuthGuardUI(req, res);
};