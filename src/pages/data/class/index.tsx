import { Anchor, Flex, Box, Breadcrumbs, Card, Container, createStyles, Text, Title, Avatar, Code, Table, ActionIcon, Group, AppShell } from "@mantine/core";
import { Manufacturer } from "@prisma/client";
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

export default function DataClassIndex({ user }: { user: User}) {

    const { data, isLoading, refetch, isFetching } = trpc.useQuery([
        "cs.getMany"
    ]);

    const router  = useRouter();

    if (!data) return <MainPageLoading user={user} title={"Classes"}/>

    return (
        <>
            <Head><title>Classes</title></Head>

            <MainLayout user={user}>
                <DataTitle
                            title={"Classes"}
                            refetch={() => refetch()}
                            prevLinks={[]}
                            isFetching={isFetching}
                            type={Type.LIST}/>

                        <Card withBorder p={0}>
                            <Table striped highlightOnHover>
                            <thead>
                                    <tr>
                                        <th>Number</th>
                                        <th>Type</th>
                                        <th>Model</th>
                                        <th>Manufacturer</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((classs: ClassWithManufacturer) => <tr key={classs.id}>
                                        <td><Anchor onClick={() => router.push("/data/class/"+classs.no)} color="dark">
                                            Class {classs.no}
                                        </Anchor></td>
                                        <td>{classs.type}</td>
                                        <td>{classs.model}</td>
                                        <td><Anchor onClick={() => router.push("/data/manufacturer/"+classs.manufacturer.id)} color="dark">
                                            <Flex
                                                gap="sm"
                                                align="center">
                                                <Avatar src={"https://logo.clearbit.com/" + classs.manufacturer.website} size="sm"/>
                                                {classs.manufacturer.name}
                                            </Flex>
                                        </Anchor></td>
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