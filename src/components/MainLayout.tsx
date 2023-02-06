import { ActionIcon, AppShell, Box, Breadcrumbs, Flex, Skeleton, Text, Title } from "@mantine/core";
import { User } from "next-auth";
import React, { ReactElement } from "react";
import { History, Plus } from "tabler-icons-react";
import { HeaderMiddle } from "./headerMiddle";
import { NavbarNested } from "./NavbarNested";

export default function MainLayout({user, children}:{user:User, children:React.ReactNode}) {
    return <AppShell
        navbar={<NavbarNested/>}
        header={<HeaderMiddle user={user}/>}
        styles={(theme) => ({
            main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}>  
        <Box px={"md"}>
            {children}
        </Box>
    </AppShell>

}