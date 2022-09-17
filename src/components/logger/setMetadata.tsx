import { Button, Card, TextInput, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";

export default function SetMetadata({ onComplete }: SetMetadataProps) {
    // Build a mantine form for validation
    const form = useForm({
        initialValues: {
            location: '',
            date: new Date(),
        },
        validate: {
            location: (value) => (value.length != 0) ? null : 'Invalid location',
        },
        validateInputOnChange: true
    });

    // Return the UI
    return (
        <Card withBorder>
            <Title order={3}>Where and when</Title>
            <form onSubmit={form.onSubmit((values) => 
                onComplete(values.location, values.date.toLocaleDateString()))}>
                <TextInput
                    placeholder="Birmingham New St"
                    label="Location"
                    description="Roughly where you saw this train"
                    {...form.getInputProps('location')}
                    mb={10}
                />
                <DatePicker 
                    placeholder="Pick date" 
                    label="Date"
                    description="The date when you saw this train"
                    dropdownType="modal"
                    labelFormat="DD/MM/YYYY"
                    {...form.getInputProps('date')}
                    mb={10} />
                <Button type="submit">Next</Button>
            </form>
        </Card>
    );
}

// Props for the element
interface SetMetadataProps {
    onComplete: (location: string, date: string) => void,
}