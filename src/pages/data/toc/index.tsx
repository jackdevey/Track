import { Anchor, Flex, Breadcrumbs, Card, Container, createStyles, Text, Title, Avatar, Code, Table, ActionIcon, Group, AppShell, Box } from "@mantine/core";
import { GetServerSideProps } from "next";
import { User } from "next-auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { Flag } from "tabler-icons-react";
import { AuthGuardUI } from "../../../components/authGuard";
import DataTitle, { Type } from "../../../components/dataTitle";
import { HeaderMiddle } from "../../../components/headerMiddle";
import MainLayout from "../../../components/MainLayout";
import { MainPageLoading } from "../../../components/mainPageLoading";
import { NavbarNested } from "../../../components/NavbarNested";
import { trpc } from "../../../utils/trpc";

export default function OP({ user }: { user: User}) {


    const { data, isLoading, refetch, isFetching } = trpc.useQuery([
        "op.getMany"
    ]);

    const router  = useRouter();

    if (!data) return <MainPageLoading user={user}/>

    return (
        <>
            <Head><title>TOCs</title></Head>



            <MainLayout user={user}>
                    <DataTitle
                        title={"Operators"}
                        refetch={() => refetch()}
                        prevLinks={[]}
                        isFetching={isFetching}
                        type={Type.LIST}/>

                    <Card withBorder p={0}>
                        <Table striped highlightOnHover>
                            <thead>
                                <tr>
                                    <th>Operator</th>
                                    <th>Short name</th>
                                    <th>Code</th>
                                    <th>Franchise</th>
                                    <th>Website</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((operator) => <tr key={operator.id}>
                                    <td>
                                        <Anchor onClick={() => router.push("./toc/"+operator.code)} color="dark">
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
                                        <ActionIcon style={{float: "right"}}>
                                            <Flag size={18} />
                                        </ActionIcon>
                                    </td>
                                </tr>)}
                            </tbody>
                        </Table>
                    </Card>
                </MainLayout>
        </>
    )
}

// Use authGuard for UI
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    return await AuthGuardUI(req, res);
};