import { Box, Card, Container, createStyles, Divider, Grid, Stack, Text, Title, Image, Avatar } from "@mantine/core";
import { Class } from "@prisma/client";
import { GetServerSideProps } from "next";
import { User } from "next-auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { AttributePoint } from "../../../components/attributePoint";
import { AuthGuardUI } from "../../../components/authGuard";
import { ClassThumbnail } from "../../../components/classList/operatorCard";
import { HeaderMiddle } from "../../../components/headerMiddle";
import { MainPageLoading } from "../../../components/mainPageLoading";
import { trpc } from "../../../utils/trpc";

export default function MF({ user }: { user: User}) {

    // Get id from router
    const router = useRouter();
    const { id } = router.query;

    const { data, isLoading } = trpc.useQuery([
        "mf.get",
        { id: id as string },
    ]);

    const { classes } = useStyles();

    if (!data) return <MainPageLoading user={user}/>

    return (
        <>
            <Head><title>{data.name}</title></Head>
            <HeaderMiddle user={user}/>
            <Box className={classes.header}>
                <Container size={"xl"}>
                    <div style={{display: "flex"}} className={classes.headerText}>
                        <Avatar src={data.logoUrl} mr={20} size={"xl"}>{data.name}</Avatar>
                        <div style={{marginTop: "5px"}}>
                            <Title>{data.name}</Title>
                            <Text>Manufacturer</Text>
                        </div>
                    </div>
                </Container>
            </Box>
            <Container my={20} size={"lg"}>
                <Grid>
                    <Grid.Col md={7}>
                        <Stack>
                            <Card withBorder shadow="sm">
                                <AttributePoint
                                    name="Status"
                                    value={data.status}/>
                                <Divider my={10}/>                             
                                <AttributePoint
                                    name="Website"
                                    value={data.website}
                                    href={"https://" + data.website}/>
                                <Divider my={10}/>                     
                                <AttributePoint
                                    name="Headquarters"
                                    value={data.headquarters}/>
                                <Divider my={10}/>
                                <AttributePoint
                                    name="Products"
                                    value={data.classes.length}/>
                            </Card>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col md={5}>
                        <Card withBorder shadow="sm">
                            {data.classes.map((cls: ClassWithOperators, i: number) => (
                                <>
                                    <ClassThumbnail classObj={cls} manufacturer={data}/>
                                    {data.classes.length - 1 != i && <Divider my={10}/>}
                                </>
                            ))}                     
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