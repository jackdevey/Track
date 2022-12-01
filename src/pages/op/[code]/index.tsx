import { Anchor, Tooltip, BackgroundImage, Box, Breadcrumbs, Button, Card, Container, createStyles, Divider, Grid, LoadingOverlay, Space, Stack, Text, Title, Image, Skeleton, Alert, Avatar, Code, Tabs, Group, Paper } from "@mantine/core";
import { Illustration, OperatorSet } from "@prisma/client";
import { GetServerSideProps } from "next";
import { User } from "next-auth";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft, CircuitGroundDigital, InfoCircle } from "tabler-icons-react";
import { AttributePoint } from "../../../components/attributePoint";
import { AuthGuardUI } from "../../../components/authGuard";
import { OperatorSetThumbnail } from "../../../components/classList/operatorCard";
import { HeaderMiddle } from "../../../components/headerMiddle";
import { MainPageLoading } from "../../../components/mainPageLoading";
import { trpc } from "../../../utils/trpc";

export default function OP({ user }: { user: User}) {

    // Get code from router
    const router = useRouter();
    const { code } = router.query;

    const { data, isLoading } = trpc.useQuery([
        "op.getMany"
    ]);

    const { classes } = useStyles();

    if (!data) return <MainPageLoading user={user}/>

    return (
        <>
            <Head><title>a</title></Head>
            <HeaderMiddle user={user}/>
          
            
            <Container my={20} size={"lg"}>

                <Title mb="md">All TOCs</Title>

                <table width="100%">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Franchise</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((operator) => <tr>
                            <td><Anchor href={"/op/"+operator.code}><Code>{operator.code}</Code></Anchor></td>
                            <td style={{display: "flex", gap: "5px", alignItems: "center"}}>
                                <Avatar src={operator.logoUrl} size="sm"/>
                                <Text>{operator.name}</Text>
                            </td>
                            <td>{operator.franchise}</td>
                        </tr>)}
                    </tbody>
                </table>
            </Container>
        </>
    )
}

const useStyles = createStyles((theme) => ({
    header: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark![6] : theme.colors.gray![0],
        borderBottom: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark![5] : theme.colors.gray![2]
        }`,
    },

    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      },
    
      avatar: {
        border: `2px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
      },

    titleRow: {
        display: 'flex',
        alignItems: 'center',
        gap: "10px",
        paddingTop: "20px",
    
        [theme.fn.smallerThan('sm')]: {
          justifyContent: 'flex-start',
        },
      },
      
}));

// Use authGuard for UI
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    return await AuthGuardUI(req, res);
};



