import { Anchor, Tooltip, BackgroundImage, Box, Breadcrumbs, Button, Card, Container, createStyles, Divider, Grid, LoadingOverlay, Space, Stack, Text, Title, TextInput, ColorSwatch, Group, Checkbox, Code, Badge } from "@mantine/core";
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
import { TimeInput, DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import showErrorPopup from "../../../components/errorPopup";
import InlineTicketsCount from "../../../components/tickets/inlineTicketsCount";
import SightingBlock from "../../../components/sightingCard";

export default function RS({ user }: { user: User}) {

    // Get identifier from router
    const router = useRouter();
    const { identifier } = router.query;

    // Get data about the train
    const { data, isLoading } = trpc.useQuery(["rs.get", { identifier: identifier as string }]);
    const id = data?.id

    // Get data about the train sightings
    const { data: sightings, isLoading: _ } = trpc.useQuery(["si.getAll", { rStockId: id as string, take: 2 }], { enabled: !!id});

    // Get sighting log information
    const createSighting = trpc.useMutation(['si.create']);

    // When log sighting is pressed
    const logSighting = (values: LogSightingValues) => {
        // Call api 
        createSighting.mutate({
            rStockIds: [(data.id)],
            location: values.location,
            date: values.date
        })
        if (createSighting.isError) {
            showNotification({
                title: 'ded',
                color: "red",
                message: createSighting.error.message
            });

            return;
        }
        // Show notification for confirmation
        showNotification({
            title: 'Sighting logged',
            message: `Your sighting of ${identifier} at ${values.location} has been saved`,
            icon: <Check/>
        })
    }

    const { classes } = useStyles();

    if (!data || !sightings) return <MainPageLoading user={user}/>

    return (
        <>
            <Head>
                <title>{identifier}</title>
            </Head>
            <HeaderMiddle user={user}/>
            <Box className={classes.header}>
                <Container size={"xl"}>
                    <div className={classes.headerText}>
                        <Title>{identifier}</Title>
                        <Text>Passenger train ({data.opSet.class.type})</Text>
                    </div>
                </Container>
            </Box>
            <Container my={20} size={"lg"}>
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
                                    value={
                                        // Cut off formation if too many cars
                                        ((data.carCount >= 6) && <CompactFormation formation={data.formation}/>) ||
                                        ((data.carCount < 6) && data.formation)
                                    }/>
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
                                                    <div style={{display: "flex", flexWrap: "nowrap", overflowX: "auto"}}>
                                                        <img 
                                                            src={illustration.url}
                                                            height="30px"
                                                            style={{marginTop: 10, overflowY: "scroll", flex: "0 0 auto"}}/>
                                                    </div>
                                                </Anchor>
                                        </Tooltip>
                                        {i != data.opSet.illustrations.length - 1 && <Divider my={10}/>}
                                    </>
                                ))}
                                
                            </Card>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col md={4}>
                        <Stack>
                            <Card withBorder shadow="sm">
                                <div style={{display: 'flex'}}>
                                    <Checkbox checked={true} mr={10}/>
                                    <Title order={4} mr={10}>Seen 4 times</Title>
                                    <InlineTicketsCount count={10}/>
                                </div>
                                <Text></Text>
                            </Card>
                            <Card withBorder shadow="sm">
                                <Title order={4} mb={15}>Previous sightings</Title>
                                {sightings.map((sighting: SightingForList, i: number) => (
                                    <>
                                        <SightingBlock sighting={sighting} hasChips={false}/>
                                        <Divider my={10}/>
                                    </>
                                ))}
                                <Anchor href="/sightings">+ 2 more</Anchor>
                            </Card>
                            <Card withBorder shadow="sm">
                                <Title order={4}>Log sighting</Title>
                                <Box mt={10}>
                                <LogSightingForm
                                    onSubmit={(values: LogSightingValues) => 
                                        logSighting(values)
                                    }/>
                                </Box>
                            </Card>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Container>
        </>
    )
}

function CompactFormation({ formation }: { formation: string}) {
    const formationList = formation.split(" ");
    return (
        <Tooltip label={formation}>
            <Text>{formationList[0]} {formationList[1]} <Code>...</Code> {formationList[formationList.length - 2]} {formationList[formationList.length - 1]}</Text>
        </Tooltip>
    );
}

function LogSightingForm({ onSubmit }: LogSightingFormProps) {
    const form = useForm({
        initialValues: {
            location: '',
            date: new Date()
        },
        validate: {
            location: (value: string) => value ? null : 'No location provided'
        }
    });

    return <form onSubmit={form.onSubmit((values: LogSightingValues) => onSubmit(values))}>
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
    date: Date
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