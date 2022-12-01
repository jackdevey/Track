import { ActionIcon, Anchor, Breadcrumbs, Flex, Text, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { History, Plus, Refresh } from "tabler-icons-react";
import styles from "./test.module.css";

export default function DataTitle({ title, prevLinks, refetch, isFetching }: Props) {
    const router = useRouter();

    return <>
        <Flex align="start" justify="space-between">
            <div>
                <Flex gap="xs" align="end">
                    <Title>{title}</Title>
                        <ActionIcon>
                            {!isFetching && <Refresh size={18} onClick={() => refetch()}/>}
                            {isFetching && <Refresh size={18} className={styles.loading}/>}
                        </ActionIcon>
                    </Flex>
                    <Breadcrumbs mt="xs">
                        <Anchor href="/">Track</Anchor>
                        {prevLinks.map((link: Link) => 
                            <Anchor onClick={() => router.push(link.path)}>{link.name}</Anchor>
                        )}
                        <Text>{title}</Text>
                    </Breadcrumbs>
                </div>
                <div>
                    <Flex gap="xs">
                        <ActionIcon size="lg">
                            <Plus size={20} />
                        </ActionIcon>
                        <ActionIcon size="lg">
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
}

interface Link {
    name: string;
    path: string;
}