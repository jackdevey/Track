import { ActionIcon, Anchor, Breadcrumbs, Button, Card, Container, HoverCard, Stepper, Text, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { HeaderMiddle } from "../components/headerMiddle";
import IdentifyTrain from "../components/logger/identifyTrain";
import SetMetadata from "../components/logger/setMetadata";
import GetConfirmation from "../components/logger/getConfirmation";

export default function LogPage() {
    // State variables
    const [active, setActive] = useState(0);
    const [idDesc, setIdDesc] = useState("Find the correct train");
    const [ldDesc, setLdDesc] = useState("Say where & when it was seen");

    // Sighting parameters
    const [train, setTrain] = useState("Unknown");
    const [location, setLocation] = useState("Unknown");
    const [date, setDate] = useState("Unknown");

    return (
        <>
            <Container>
                <Breadcrumbs mt={30}>
                    <Anchor href="/" key="main">
                        Track
                    </Anchor>
                    <Anchor href="/log" key="log">
                        Log sighting
                    </Anchor>
                </Breadcrumbs>
                <Stepper active={active} mt={30}>
                    <Stepper.Step label="Identification" description={idDesc}>
                        <Container size="xs" mt={50}>
                            <IdentifyTrain onComplete={onTrainIdentified}/>
                        </Container>
                    </Stepper.Step>
                    <Stepper.Step label="Location &amp; Date" description={ldDesc}>
                        <Container size="xs" mt={50}>
                            <SetMetadata onComplete={onMetadataSet}/>
                        </Container>
                    </Stepper.Step>
                    <Stepper.Step label="Review" description="Confirm details before saving">
                        <Container size="xs" mt={50}>
                            <GetConfirmation 
                                train={train} 
                                location={location}
                                date={date} 
                                onComplete={onFinish}/>
                        </Container>
                    </Stepper.Step>
                </Stepper>
            </Container>
        </>
    );

    function onTrainIdentified(train) {
        setActive(1);
        setIdDesc(`${train.identifier} (${train.type})`);
        setTrain(train);
    }
    
    function onMetadataSet(location: string, date: string) {
        setActive(2);
        setLdDesc(location + " on " + date);
        setLocation(location);
        setDate(date);
    }
    
    function onFinish() {
        setActive(3);
    }
}