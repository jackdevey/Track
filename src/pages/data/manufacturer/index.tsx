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
        "mf.getMany"
    ]);

    const router  = useRouter();

    if (!data) return <MainPageLoading user={user}/>

    return (
        <>
            <Head><title>Manufacturers</title></Head>
            <HeaderMiddle user={user}/>
          
            <Container my={20} size={"lg"}>
                <DataTitle
                    title={"Manufacturers"}
                    refetch={() => refetch()}
                    prevLinks={[{ name: "Data", path: "/data" }]}
                    isFetching={isFetching}
                    type={Type.LIST}/>

                <Card withBorder p={0}>
                    <Table striped highlightOnHover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Headquarters</th>
                                <th>Website</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((manufacturer: Manufacturer) => <tr key={manufacturer.id}>
                                <td><Anchor onClick={() => router.push("/data/manufacturer/"+manufacturer.id)} color="dark">
                                    <Flex
                                        gap="sm"
                                        align="center">
                                        <Avatar src={"https://logo.clearbit.com/" + manufacturer.website} size="sm"/>
                                        {manufacturer.name}
                                    </Flex>
                                </Anchor></td>
                                <td>{manufacturer.headquarters}</td>
                                <td><Anchor onClick={() => router.push("https://"+manufacturer.website)}>{manufacturer.website}</Anchor></td>
                                <td>{manufacturer.status}</td>
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