import { Anchor, Tooltip, BackgroundImage, Box, Breadcrumbs, Button, Card, Container, createStyles, Divider, Grid, LoadingOverlay, Space, Stack, Text, Title, Image, Skeleton, Alert, Avatar } from "@mantine/core";
import { Class, Manufacturer } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft, CircuitGroundDigital, InfoCircle } from "tabler-icons-react";
import { ClassThumbnail, OperatorSetThumbnail } from "../../components/classList/operatorCard";
import { HeaderMiddle } from "../../components/headerMiddle";
import { trpc } from "../../utils/trpc";

export default function RstockPage() {

    // Get code from router
    const router = useRouter();
    const { id } = router.query;

    const { data, isLoading } = trpc.useQuery([
        "mf.get",
        { id: id as string },
    ]);

    const { classes } = useStyles();

    if (!data) return <LoadingOverlay visible={true}></LoadingOverlay>

    return (
        <>
            <HeaderMiddle/>
            <Box className={classes.header}>
                <Container>
                    <div className={classes.headerText}>
                        <Title>{data.name}</Title>
                        <Text>Manufacturer</Text>
                    </div>
                </Container>
            </Box>
            <Container my={20}>
                <Grid>
                    <Grid.Col md={9}>
                        <Stack>
                            <Card withBorder>
                                <div className={classes.titleRow}>
                                    <Text><b>Headquaters</b></Text>
                                    <Text>Derby, England</Text>
                                </div>
                                <Divider my={10}/>
                                <div className={classes.titleRow}>
                                    <Text><b>Products</b></Text>
                                    <Text>{data.classes.length}</Text>
                                </div>
                            </Card>
                            <Text><b>Products</b></Text>
                            <Card withBorder>
                                {data.classes.map((classObj: Class, i: number) => (
                                    <>
                                        <ClassThumbnail classObj={classObj} manufacturer={data}/>
                                        {data.classes.length - 1 != i && <Divider my={10}/>}
                                    </>
                                ))}                     
                            </Card>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col md={3}>
                        <Card withBorder>
                        <Card.Section>
                            <Image src="https://i.postimg.cc/3Nv9CCxH/Untitled-design-2.png"/>
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