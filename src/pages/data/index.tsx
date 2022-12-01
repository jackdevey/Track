import { Anchor, Flex, Breadcrumbs, Card, Container, createStyles, Text, Title, Avatar, Code, Table, ActionIcon, Group } from "@mantine/core";
import { GetServerSideProps } from "next";
import { User } from "next-auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { Flag, History, Plus, Refresh } from "tabler-icons-react";
import { AuthGuardUI } from "../../components/authGuard";
import DataTitle from "../../components/dataTitle";
import { HeaderMiddle } from "../../components/headerMiddle";
import { MainPageLoading } from "../../components/mainPageLoading";
import { trpc } from "../../utils/trpc";

export default function OP({ user }: { user: User}) {


    return (
        <>
            <Head><title>Data</title></Head>
            <HeaderMiddle user={user}/>
          
            <Container my={20} size={"lg"}>

                <DataTitle
                    title={"Data"}
                    refetch={() => null}
                    prevLinks={[]}
                    isFetching={false}/>

                <Card withBorder p={0} mt="lg">
                    <Table striped highlightOnHover>
                        <thead>
                            <tr>
                                <th>Subset</th>
                                <th>Description</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={"1"}>
                                <td><Anchor href={"/data/toc/"} color="dark">TOCs</Anchor></td>
                                <td>Train operating companies</td>
                            </tr>
                            <tr key={"2"}>
                                <td><Anchor href={"/data/class/"} color="dark">Classes</Anchor></td>
                                <td>Rolling stock classes</td>
                            </tr>
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