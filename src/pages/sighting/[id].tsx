import { Card, Container, Divider, Text, Title, Anchor, Grid, Box, Stack, Badge } from "@mantine/core";
import { GetServerSideProps } from "next";
import { User } from "next-auth";
import { useRouter } from "next/router";
import { Checkbox } from "tabler-icons-react";
import { AuthGuardUI } from "../../components/authGuard";
import { HeaderMiddle } from "../../components/headerMiddle";
import { MainPageLoading } from "../../components/mainPageLoading";
import InlineTicketsCount from "../../components/tickets/inlineTicketsCount";
import { DoubleTitle } from "../../components/titles";
import { trpc } from "../../utils/trpc";

export default function Sighting({ user }: { user: User }) {
    // Get id
    const router = useRouter();
    const { id } = router.query;
    // Get data about the sighting
    const { data, isLoading } = trpc.useQuery(["si.get", { id: id as string }]);
    // If is loading, return loading screen
    if (isLoading) return <MainPageLoading user={user}/>;

    console.log(data);

    return <>
        <HeaderMiddle user={user}/>
        <DoubleTitle title={data.location} subtitle="Sighting"/>
        <Container size={"lg"} mt={20}>
            <Grid>
                <Grid.Col md={8}>
                    <Stack>
                        <Card withBorder shadow="sm">
                            {data.rStockSightings.map((sighting: SightingFull, i: number) => <>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <div style={{alignItems: 'center'}}>
                                        <Title order={4}>{sighting.rstock.identifier}</Title>
                                        <Text>{sighting.rstock.opSet.operator.name}</Text>
                                        {sighting.userFirst && <Badge style={{alignSelf: 'center'}}>First</Badge>} <InlineTicketsCount count={2}/>
                                    </div>
                                    <Anchor onClick={() => router.push("/rs/" + sighting.rstock.identifier)}>View</Anchor>
                                </div>
                                {i != data.rStockSightings.length - 1 && <Divider my={10}/>}
                            </>)}
                        </Card>
                        <Card withBorder shadow="sm">
                            <Title order={4}>New sighting</Title>
                            <Box mt={10}>
                                <Text>Coming soon</Text>
                            </Box>
                        </Card>
                    </Stack>
                </Grid.Col>
                <Grid.Col md={4}>
                    <Card withBorder shadow="sm">
                        <div style={{display: 'flex'}}>
                            <Title order={4} mr={10}>+10 Tickets</Title>
                            <InlineTicketsCount count={10}/>
                        </div>
                        <Text></Text>
                    </Card>
                </Grid.Col>
            </Grid>
        </Container>
    </>;
}

// Use authGuard for UI
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    return await AuthGuardUI(req, res);
};