import { HeaderMiddle } from "./headerMiddle";
import { Box, Container, Skeleton, createStyles, Flex, Title, ActionIcon, Breadcrumbs, Anchor, Text, Card, Table, AppShell } from "@mantine/core";
import { User } from "next-auth";
import { History, Plus, Refresh } from "tabler-icons-react";
import { NavbarNested } from "./NavbarNested";
import Head from "next/head";


export function MainPageLoading({user, title}: {user:User, title:string}) {

    return <>
            <Head><title>{title}</title></Head>

            <AppShell
                navbar={<NavbarNested/>}
                header={<HeaderMiddle user={user}/>}
                styles={(theme) => ({
                    main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
                })}
                >  
                <Box px={"md"}>
                    <Flex align="start" justify="space-between">
                        <div>
                            <Flex gap="xs" align="end">
                                <Skeleton visible={true}><Title>Bla bla bla bla</Title></Skeleton>
                            </Flex>
                            <Breadcrumbs mt="xs">
                                <Skeleton visible={true}><Text>Some links here</Text></Skeleton>
                            </Breadcrumbs>
                        </div>
                        <div>
                            <Skeleton visible={true}>
                                <Flex gap="xs">
                                    <ActionIcon size="lg">
                                        <Plus size={20} />
                                    </ActionIcon>
                                    <ActionIcon size="lg">
                                        <History size={20} />
                                    </ActionIcon>
                                </Flex>
                            </Skeleton>
                        </div>
                    </Flex>
                </Box>
            </AppShell>
    </>
}

export function SubPageLoading({user}: {user:User}) {

    const { classes } = useStyles();

    return <>
        <HeaderMiddle user={user}/>
        <Box className={classes.header}>
            <Container size="xl">
                <div className={classes.headerText}>
                    <Skeleton height={40} width="30%" />
                </div>
            </Container>
        </Box>
    </>
}


const useStyles = createStyles((theme) => ({
    header: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark![6] : theme.colors.gray![0],
        borderBottom: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark![5] : theme.colors.gray![2]
        }`,
    },

    headerText: {
        paddingTop: 50,
        paddingBottom: 40,
    }
}));