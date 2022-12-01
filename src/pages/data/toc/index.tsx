import { Anchor, Flex, Breadcrumbs, Card, Container, createStyles, Text, Title, Avatar, Code, Table, ActionIcon, Group } from "@mantine/core";
import { GetServerSideProps } from "next";
import { User } from "next-auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { Flag, History, Plus, Refresh } from "tabler-icons-react";
import { AuthGuardUI } from "../../../components/authGuard";
import DataTitle from "../../../components/dataTitle";
import { HeaderMiddle } from "../../../components/headerMiddle";
import { MainPageLoading } from "../../../components/mainPageLoading";
import { trpc } from "../../../utils/trpc";

export default function OP({ user }: { user: User}) {


    const { data, isLoading, refetch, isFetching } = trpc.useQuery([
        "op.getMany"
    ]);

    const { classes } = useStyles();

    if (!data) return <MainPageLoading user={user}/>

    return (
        <>
            <Head><title>TOCs</title></Head>
            <HeaderMiddle user={user}/>
          
            <Container my={20} size={"lg"}>
                <DataTitle
                    title={"TOCs"}
                    refetch={() => refetch()}
                    prevLinks={[{ name: "Data", path: "/data" }]}
                    isFetching={isFetching}/>

                <Card withBorder p={0} mt="lg">
                    <Table striped highlightOnHover>
                        <thead>
                            <tr>
                                <th>Operator</th>
                                <th>Short name</th>
                                <th>Code</th>
                                <th>Franchise</th>
                                <th>Website</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((operator) => <tr key={operator.id}>
                                <td>
                                    <Anchor href={"./toc/"+operator.code} color="dark">
                                        <Flex
                                            gap="sm"
                                            align="center">
                                            <Avatar src={"https://logo.clearbit.com/" + operator.website} size="sm"/>
                                            {operator.name}
                                        </Flex>
                                    </Anchor>
                                </td>
                                <td>{operator.shortName || "-"}</td>
                                <td><Code>{operator.code}</Code></td>
                                <td>{operator.franchise || "-"}</td>
                                <td>{<Anchor href={"https://" + operator.website}>{operator.website}</Anchor> || "-"}</td>
                                <td>
                                    <Group spacing="xs">
                                        <ActionIcon>
                                            <Flag size={18} />
                                        </ActionIcon>
                                        <ActionIcon>
                                            <Flag size={18} />
                                        </ActionIcon>
                                    </Group>
                                </td>
                            </tr>)}
                        </tbody>
                    </Table>
                </Card>
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

    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      },
    
      avatar: {
        border: `2px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
      },

    titleRow: {
        display: 'flex',
        alignItems: 'center',
        gap: "10px",
        paddingTop: "20px",
    
        [theme.fn.smallerThan('sm')]: {
          justifyContent: 'flex-start',
        },
      },
      
}));

// Use authGuard for UI
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    return await AuthGuardUI(req, res);
};