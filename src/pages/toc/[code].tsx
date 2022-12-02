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
import styles from "./test.module.css";

export default function OP({ user }: { user: User}) {

    const router = useRouter();

    const { code } = router.query

    const { data, isLoading, refetch, isFetching } = trpc.useQuery([
        "op.get", { code: code as string }
    ]);

    if (!data) return <MainPageLoading user={user}/>

    return (
        <>
            <Head><title>{data.name}</title></Head>
            <HeaderMiddle user={user}/>
          
            <Container my={20} size={"lg"}>

                <DataTitle
                    title={data.name}
                    refetch={() => refetch()}
                    prevLinks={[
                        { name: "TOCs", path: "/toc" }
                    ]}
                    isFetching={isFetching}/>
                
            </Container>
        </>
    )
}

// Use authGuard for UI
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    return await AuthGuardUI(req, res);
};