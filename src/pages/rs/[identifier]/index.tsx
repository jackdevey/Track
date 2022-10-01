import { Anchor, Tooltip, BackgroundImage, Box, Breadcrumbs, Button, Card, Container, createStyles, Divider, Grid, LoadingOverlay, Space, Stack, Text, Title, TextInput } from "@mantine/core";
import { Illustration } from "@prisma/client";
import type { GetServerSideProps } from "next";
import { User } from "next-auth";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft, Calendar, Check, CircuitGroundDigital, Clock, Location, Pin } from "tabler-icons-react";
import { AttributePoint } from "../../../components/attributePoint";
import { AuthGuardUI } from "../../../components/authGuard";
import { HeaderMiddle } from "../../../components/headerMiddle";
import { MainPageLoading } from "../../../components/mainPageLoading";
import { RouterTransition } from "../../../components/routerTransition";
import { trpc } from "../../../utils/trpc";
import { showNotification } from "@mantine/notifications";
import { AutocompleteLoading } from "../../../components/locationAutocomplete";
import { TimeInput, DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";

export default function RS({ user }: { user: User}) {

    // Get identifier from router
    const router = useRouter();
    const { identifier } = router.query;

    // Get data about the train
    const { data, isLoading } = trpc.useQuery(["rs.get", { identifier: identifier as string }]);

    const { classes } = useStyles();

    if (!data) return <MainPageLoading user={user}/>

    return (
        <>
            <Head>
                <title>{identifier}</title>
            </Head>
            <HeaderMiddle user={user}/>
            <Box className={classes.header}>
                <Container>
                    <div className={classes.headerText}>
                        <Title>{identifier}</Title>
                        <Text>Passenger train ({data.opSet.class.type})</Text>
                    </div>
                </Container>
            </Box>
            <Container my={20}>
                <Grid>
                    <Grid.Col md={8}>
                        <Stack>
                            <Card withBorder shadow="sm">
                                <AttributePoint
                                    name="Class"
                                    value={data.opSet.class.no}
                                    href={`/cs/${data.opSet.class.no}`}/>
                                <Divider my={10}/>
                                <AttributePoint
                                    name="Formation"
                                    value={data.formation}/>
                                <Divider my={10}/>
                                <AttributePoint
                                    name="Carriages"
                                    value={data.carCount}/>
                                <Divider my={10}/>
                                <AttributePoint
                                    name="Operator"
                                    value={data.opSet.operator.name}
                                    href={`/op/${data.opSet.operator.code}`}/>
                                <Divider my={10}/>
                                <AttributePoint
                                    name="Livery"
                                    value={data.livery}/>
                                <Divider my={10}/>
                                <AttributePoint
                                    name="Depot"
                                    value={data.depot}/>
                                <Divider my={10}/>
                                <AttributePoint
                                    name="Manufacturer"
                                    value={data.opSet.class.manufacturer.name}
                                    href={`/mf/${data.opSet.class.manufacturerId}`}/>
                                <Divider my={10}/>
                                <AttributePoint
                                    name="Built"
                                    value={data.builtYear}/>
                            </Card>
                            <Card withBorder shadow="sm">
                                <Text><b>Illustrations</b></Text>
                                {data.opSet.illustrations.map((illustration: Illustration, i: number) => (
                                    <>
                                        <Tooltip 
                                            label={"By " + illustration.author + ", " + illustration.license}
                                            color="dark"
                                            offset={-10}
                                            withArrow>
                                                <Anchor href={illustration.source}>
                                                    <img 
                                                        src={illustration.url}
                                                        height="30px"
                                                        style={{marginTop: 10}}/>
                                                </Anchor>
                                        </Tooltip>
                                        {i != data.opSet.illustrations.length - 1 && <Divider my={10}/>}
                                    </>
                                ))}
                                
                            </Card>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col md={4}>
                        <Card withBorder shadow="sm">
                            <Title order={4}>Log sighting</Title>
                            <Box mt={10}>
                            <LogSightingForm
                                onSubmit={(values: LogSightingValues) => 
                                    showNotification({
                                        title: 'Sighting logged',
                                        message: `Your sighting of ${identifier} at ${values.location} has been saved`,
                                        icon: <Check/>
                                    })
                                }/>
                            </Box>
                        </Card>
                    </Grid.Col>
                </Grid>
            </Container>
        </>
    )
}

function LogSightingForm({ onSubmit }: LogSightingFormProps) {
    const form = useForm({
        initialValues: {
            location: '',
            time: new Date(),
            date: new Date(),
        },
        validate: {
            location: (value: string) => value ? null : 'No location provided'
        }
    });

    return <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <TextInput
            label="Location"
            icon={<Location size={16}/>}
            placeholder="Birmingham New St"
            {...form.getInputProps('location')}/>
        <DatePicker
            mt={5}
            label="Date"
            icon={<Calendar size={16}/>}
            clearable={false}
            dropdownType="modal"
            {...form.getInputProps('date')}/>
        <TimeInput
            mt={5}
            label="Time"
            icon={<Clock size={16}/>}
            {...form.getInputProps('time')}/>
        <Button
            mt={10}
            type="submit">
            Save
        </Button>
    </form>
}

type LogSightingFormProps = {
    onSubmit: (values: LogSightingValues) => void
}

type LogSightingValues = {
    location: string, 
    date: Date,
    time: Date
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
    },

    titleRow: {
        display: 'flex',
    
        [theme.fn.smallerThan('sm')]: {
            justifyContent: 'flex-start',
            flexDirection: 'column',
            alignItems: 'left'
        },

        [theme.fn.largerThan('sm')]: {
            justifyContent: 'space-between',
            alignItems: 'center'
        },
      },
}));

// Use authGuard for UI
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    return await AuthGuardUI(req, res);
};