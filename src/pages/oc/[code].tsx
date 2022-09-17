import { Anchor, Tooltip, BackgroundImage, Box, Breadcrumbs, Button, Card, Container, createStyles, Divider, Grid, LoadingOverlay, Space, Stack, Text, Title, Image } from "@mantine/core";
import { Illustration } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft, CircuitGroundDigital } from "tabler-icons-react";
import { HeaderMiddle } from "../../components/headerMiddle";
import { trpc } from "../../utils/trpc";

export default function RstockPage() {

    // Get code from router
    const router = useRouter();
    const { code } = router.query;

    // Get data about the train
    // const { data, isLoading } = trpc.useQuery([
    //     "rstock.get",
    //     { identifier: identifier as string },
    // ]);

    const { classes } = useStyles();

    //if (!data) return <LoadingOverlay visible={true}></LoadingOverlay>

    return (
        <>
            <HeaderMiddle/>
            <Box className={classes.header}>
                <Container>
                    <div className={classes.headerText}>
                        <Title>CrossCountry</Title>
                        <Text>Cross Country franchise</Text>
                    </div>
                </Container>
            </Box>
            <Container my={20}>
                <Grid>
                    <Grid.Col md={9}>
                        <Stack>
                            <Card withBorder>
                                <div className={classes.titleRow}>
                                    <Text><b>Website</b></Text>
                                    <Anchor>crosscountrytrains.co.uk</Anchor>
                                </div>
                                <Divider my={10}/>
                                <div className={classes.titleRow}>
                                    <Text><b>Reporting mark</b></Text>
                                    <Text>xc</Text>
                                </div>
                                <Divider my={10}/>
                                <div className={classes.titleRow}>
                                    <Text><b>Calling stations</b></Text>
                                    <Text>120</Text>
                                </div>
                                
                            </Card>
                            <Card withBorder>
                                <Text><b>Illustrations</b></Text>
                                
                                
                            </Card>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col md={3}>
                        <Card withBorder>
                        <Card.Section>
                            <Image
                                src="https://pbs.twimg.com/profile_images/1567957220221935621/z2BNRB08_400x400.jpg"
                                
                            />
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