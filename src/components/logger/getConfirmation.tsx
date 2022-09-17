import { Button, Card, TextInput, Title } from "@mantine/core";

export default function GetConfirmation({ train, location, date, onComplete }: GetConfirmationProps) {
    // Return the UI
    return (
        <Card withBorder>
            <Title order={3}>Confirm your sighting</Title>
            <TextInput
                label="Train"
                description="This is the train you saw"
                value={train.identifier}
                mb={10}/>
            <TextInput
                label="Location"
                description="This is where you saw the train"
                value={location}
                mb={10}/>
            <TextInput
                label="Date"
                description="This is when you saw the train"
                value={date}
                mb={10}/>
            <Button onClick={onComplete}>Save</Button>
        </Card>
    );
}

// Props for the element
interface GetConfirmationProps {
    train: any,
    location: string,
    date: string,
    onComplete: () => void,
}