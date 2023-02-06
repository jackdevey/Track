import { ActionIcon, Anchor, Breadcrumbs, Flex, Modal, Skeleton, Text, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import { Edit, History, Plus, Refresh } from "tabler-icons-react";
import styles from "./test.module.css";

export default function DataTitle({ title, prevLinks, refetch, isFetching, type }: Props) {
    const router = useRouter();

    const [showHistory, setShowHistory] = useState(false);

    return <>
        <Modal
            opened={showHistory}
            onClose={() => setShowHistory(false)}
            title="History"
            size="lg">
            <Text color="dimmed" mb="0">Last updated</Text>
            <Title>2 days ago</Title>
        </Modal>
        <Flex align="start" justify="space-between" mb={"lg"}>
            <div>
                <Flex gap="xs" align="end">
                    <Title>{title}</Title>
                    <ActionIcon>
                        {!isFetching && <Refresh size={18} onClick={() => refetch()}/>}
                        {isFetching && <Refresh size={18} className={styles.loading}/>}
                    </ActionIcon>
                </Flex>
                <Breadcrumbs mt="xs">
                    <Text>Datasets</Text>
                    {prevLinks.map((link: Link) => 
                        <Anchor onClick={() => router.push(link.path)}>{link.name}</Anchor>
                    )}
                    <Text>{title}</Text>
                </Breadcrumbs>
            </div>
            <div>
                <Flex gap="xs">
                    <ActionIcon size="lg">
                        {type == Type.LIST && <Plus size={20} />}
                        {type == Type.SINGULAR && <Edit size={20} />}
                    </ActionIcon>
                    <ActionIcon size="lg" onClick={() => setShowHistory(true)}>
                        <History size={20} />
                    </ActionIcon>
                </Flex>
            </div>
        </Flex>
    </>
}

interface Props {
    title: string;
    prevLinks: Link[];
    refetch: () => any
    isFetching: boolean
    type: Type
}

export enum Type {
    SINGULAR,
    LIST
}

interface Link {
    name: string;
    path: string;
}