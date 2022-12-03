import { Anchor, Flex, Breadcrumbs, Card, Container, createStyles, Text, Title, Avatar, Code, Table, ActionIcon, Group } from "@mantine/core";
import { Manufacturer } from "@prisma/client";
import { GetServerSideProps } from "next";
import { User } from "next-auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { Flag } from "tabler-icons-react";
import { AuthGuardUI } from "../../../components/authGuard";
import DataTitle, { Type } from "../../../components/dataTitle";
import { HeaderMiddle } from "../../../components/headerMiddle";
import { MainPageLoading } from "../../../components/mainPageLoading";
import { trpc } from "../../../utils/trpc";

export default function DataClassIndex({ user }: { user: User}) {

    const { data, isLoading, refetch, isFetching } = trpc.useQuery([
        "cs.getMany"
    ]);

    const router  = useRouter();

    if (!data) return <MainPageLoading user={user}/>

    return (
        <>
            <Head><title>Classes</title></Head>
            <HeaderMiddle user={user}/>
          
            <Container my={20} size={"lg"}>
                <DataTitle
                    title={"Classes"}
                    refetch={() => refetch()}
                    prevLinks={[{ name: "Data", path: "/data" }]}
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
                                <td><Anchor onClick={() => router.push("/data/class/"+classs.id)} color="dark">
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
            </Container>
        </>
    )
}

// Use authGuard for UI
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    return await AuthGuardUI(req, res);
};