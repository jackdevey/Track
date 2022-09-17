import { Title, Container, Box, createStyles, Text, Divider, Card, Table, Grid, RingProgress, Space, Button, Avatar, Stack, LoadingOverlay, Breadcrumbs, Anchor } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft } from "tabler-icons-react";
import ShortTrainCard from "../../../components/classList/shortTrainCard";
import { HeaderMiddle } from "../../../components/headerMiddle";
import { trpc } from "../../../utils/trpc";

export default function ClassPage() {
    // Get opCode from router
    const router = useRouter();
    const { opCode, classNo } = router.query;

    const { classes } = useStyles();

    const { data: operator, isLoading } = trpc.useQuery([
        "operatingCompany.get",
        { code: opCode as string },
    ]);

    const { data: classRStock, isLoading: sd3 } = trpc.useQuery([
        "rstock.getSomeFromOperator",
        { opCode: opCode as string, classNo: classNo as string }
    ]);

    if (!operator || !classRStock) return <LoadingOverlay visible={true}></LoadingOverlay>

    let seenCount = classRStock.userSeen.length;
    let allCount = classRStock.userSeen.length + classRStock.userUnseen.length;

    return (
        <>
            <HeaderMiddle/>
            <Box className={classes.header}>
                <Container>
                    <div className={classes.headerText}>
                        <Title>{operator.name}</Title>

                        <Breadcrumbs mt={10}>
                            <Anchor href={"/class/"} key={"/class/"}>
                                All Classes
                            </Anchor>
                            <Anchor href={"/class/" + classNo} key={classNo as string}>
                                Class {classNo}
                            </Anchor>
                        </Breadcrumbs>

                    </div>
                </Container>
            </Box>
            <Container my={20}>
                <Stack>
                    <Title order={3}>Seen</Title>
                    {/** Show user seen */}
                    {classRStock.userSeen.map((rStock) => 
                        <ShortTrainCard
                            userSeen={true}
                            identifier={rStock.identifier}
                            formation={rStock.formation}
                            carCount={rStock.carCount}/>
                    )}
                    <Title order={3}>Unseen</Title>
                    {/** Show user unseen */}
                    {classRStock.userUnseen.map((rStock) => 
                        <ShortTrainCard
                            userSeen={false}
                            identifier={rStock.identifier}
                            formation={rStock.formation}
                            carCount={rStock.carCount}/>
                    )}

                </Stack>
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
        height: 56,
    
        [theme.fn.smallerThan('sm')]: {
          justifyContent: 'flex-start',
        },
      },
}));

