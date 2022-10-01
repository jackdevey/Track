import { Box, Card, Container, createStyles, Divider, Grid, Stack, Text, Title, Image, Tooltip, Avatar } from "@mantine/core";
import { Class } from "@prisma/client";
import { GetServerSideProps } from "next";
import { User } from "next-auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { AttributePoint } from "../../components/attributePoint";
import { AuthGuardUI } from "../../components/authGuard";
import { ClassThumbnail } from "../../components/classList/operatorCard";
import { HeaderMiddle } from "../../components/headerMiddle";
import { MainPageLoading } from "../../components/mainPageLoading";
import { trpc } from "../../utils/trpc";

export default function CS({ user }: { user: User}) {

    // Get id from router
    const router = useRouter();
    const { id, classNo } = router.query;

    const { data, isLoading } = trpc.useQuery([
        "cs.get",
        { classNo: classNo as string },
    ]);

    const { classes } = useStyles();

    if (!data) return <MainPageLoading user={user}/>

    return (
        <>
            <Head><title>Class {data.no}</title></Head>
            <HeaderMiddle user={user}/>
            <Box className={classes.header}>
                <Container>
                    <div className={classes.headerText}>
                        <Title>Class {data.no}</Title>
                        <Text>Rolling stock type</Text>
                    </div>
                </Container>
            </Box>
            <Container my={20}>
                <Grid>
                    <Grid.Col md={9}>
                        <Stack>
                            <Card withBorder shadow="sm">                
                                <AttributePoint
                                    name="Manufacturer"
                                    value={data.manufacturer.name}
                                    href={"/mf/" + data.manufacturer.id}/>
                                <Divider my={10}/>
                                <AttributePoint
                                    name="Units"
                                    value={"102"}/>
                            </Card>
                            {/* <Title order={4}>Products</Title>
                            <Card withBorder>
                                {data.classes.map((cls: ClassWithOperators, i: number) => (
                                    <>
                                        <ClassThumbnail classObj={cls} manufacturer={data}/>
                                        {data.classes.length - 1 != i && <Divider my={10}/>}
                                    </>
                                ))}                     
                            </Card> */}
                            <Card withBorder shadow="sm">
                                <Text mb={5}><b>Used by</b></Text>
                                <Tooltip.Group openDelay={300} closeDelay={100}>
                                    <Avatar.Group> 
                                        {data.operatorSets.map((opSet: OperatorSetFull) => (
                                            <Tooltip label={opSet.operator.name} color="dark">
                                                <Avatar 
                                                    component="a"
                                                    onClick={() => router.push(`/op/${opSet.operator.code}`)}
                                                    style={{cursor: 'pointer'}}
                                                    src={opSet.operator.logoUrl}
                                                    radius="xl"
                                                    size="md"/>
                                            </Tooltip>
                                        ))}
                                    </Avatar.Group>
                                </Tooltip.Group>
                            </Card>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col md={3}>
                        <Card withBorder>
                        <Card.Section>
                            <Image src={"a"}/>
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

    attributePoint: {
        display: 'flex',
        // For mobile
        [theme.fn.smallerThan('sm')]: {
            justifyContent: 'flex-start',
            flexDirection: 'column',
            alignItems: 'left'
        },
        // For desktop
        [theme.fn.largerThan('sm')]: {
            justifyContent: 'space-between',
            alignItems: 'center'
        },
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