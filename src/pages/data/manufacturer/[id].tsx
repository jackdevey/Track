import { Anchor, Flex, Breadcrumbs, Card, Container, createStyles, Text, Title, Avatar, Code, Table, ActionIcon, Group } from "@mantine/core";
import { GetServerSideProps } from "next";
import { User } from "next-auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { Flag, History, Plus, Refresh } from "tabler-icons-react";
import { AuthGuardUI } from "../../../components/authGuard";
import DataTitle, { Type } from "../../../components/dataTitle";
import { HeaderMiddle } from "../../../components/headerMiddle";
import MainLayout from "../../../components/MainLayout";
import { MainPageLoading } from "../../../components/mainPageLoading";
import { trpc } from "../../../utils/trpc";
import styles from "./test.module.css";

export default function DataClassSpecific({ user }: { user: User}) {

    const router = useRouter();

    const { id } = router.query

    const { data, isLoading, refetch, isFetching } = trpc.useQuery([
        "mf.get", { id: id as string }
    ]);

    if (!data) return <MainPageLoading user={user} title={"Loading..."}/>

    return (
        <>
            <Head><title>{data.name}</title></Head>
            <MainLayout user={user}>
                <DataTitle
                    title={data.name}
                    refetch={() => refetch()}
                    prevLinks={[
                        { name: "Manufacturers", path: "/data/manufacturer" }
                    ]}
                    isFetching={isFetching}
                    type={Type.SINGULAR}/>
            </MainLayout>
        </>
    )
}

// Use authGuard for UI
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    return await AuthGuardUI(req, res);
};