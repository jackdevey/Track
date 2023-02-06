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

    const { number } = router.query

    const { data, isLoading, refetch, isFetching } = trpc.useQuery([
        "cs.get", { classNo: number as string }
    ]);

    if (!data) return <MainPageLoading user={user} title={"Loading..."}/>

    return (
        <>
            <Head><title>Class {data.no}</title></Head>
            <MainLayout user={user}>
                <DataTitle
                    title={`Class ${data.no}`}
                    refetch={() => refetch()}
                    prevLinks={[
                        { name: "Classes", path: "/data/class" }
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