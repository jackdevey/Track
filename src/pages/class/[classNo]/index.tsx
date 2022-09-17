import { useTheme } from "@emotion/react";
import { Title, Container, Box, createStyles, Text, Divider, Card, Table, Grid, RingProgress, Space, Button, Avatar, Stack, LoadingOverlay, Breadcrumbs, Anchor } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft } from "tabler-icons-react";
import OperatorCard from "../../../components/classList/operatorCard";
import { HeaderMiddle } from "../../../components/headerMiddle";
import { trpc } from "../../../utils/trpc";

export default function ClassPage() {
    // Get classNo from router
    const router = useRouter();
    const { classNo } = router.query;

    const { data, isLoading } = trpc.useQuery([
        "classes.get",
        { classNo: classNo as string },
    ]);

    const { data: opSets, isLoading: a } = trpc.useQuery([
        "operatorSet.get",
        { classNo: classNo as string },
    ]);

    const { classes } = useStyles();

    if (!data || !opSets) return <LoadingOverlay visible={true}></LoadingOverlay>

    return (
        <>
            <HeaderMiddle/>
            <Box className={classes.header}>
                <Container>
                    <div className={classes.headerText}>
                        <Title>Class {classNo}</Title>
                        
                        <Breadcrumbs>
                            <Anchor href={"/class/"} key={"/class/"}>
                                All Classes
                            </Anchor>
                        </Breadcrumbs>

                    </div>
                </Container>
            </Box>
            <Container my={20}>
                <Stack>
                    {opSets.map(((opSet) => 
                        <OperatorCard
                            opName={opSet.operator.name}
                            opCode={opSet.operator.code}
                            opLogoUrl={opSet.operator.logoUrl}
                            unitsMax={29}
                            unitsUserLogged={3}
                            rStockClassNo={classNo as string}
                            rStockGraphicUrl={opSet.graphicUrl}/>
                    ))}
                
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

