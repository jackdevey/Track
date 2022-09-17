import { Button, Card, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { trpc } from "../../utils/trpc";
import showErrorPopup from "../errorPopup";

// Uses rstock.get

export default function IdentifyTrain({ onComplete }: IdentifyTrainProps) {
	// Train identifier variable
	const [identifier, setIdentifier] = useState("");

	// Checking if train exists using backend
	trpc.useQuery(['rstock.get', {identifier}], {
        // Only run when ready
        enabled: Boolean(identifier),
        // Don't ever retry
		refetchInterval: 0,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchIntervalInBackground: false,
		refetchOnReconnect: false,
		retry: false,
		// When train has been found
		onSuccess(data) {
		    onComplete(data);
		},
        // When train has not been found
		onError(_) {
            // Show error popup
            showErrorPopup(
                "Unknown identifier",
                `${identifier} is not a valid train identifier`,
                "Either this train does not exist or it is not in the database yet"
            )
            // Reset identifier to allow retrys
			setIdentifier("");
		}
	});

	// Func to check if the train exists
	const checkTrainExists = async(identifier: string) => { setIdentifier(identifier) }

    // Build a mantine form for validation
	const form = useForm({
        initialValues: {
            classNo: '',
            unitNo: '',
        },
		validate: {
			classNo: (value) => (/^\d\d\d?$/.test(value) ? null : 'Invalid class number'),
		    unitNo: (value) => (/^\d\d\d$/.test(value) ? null : 'Invalid unit number')
		},
		validateInputOnChange: true
	});

    // Return the UI
	return (
		<Card withBorder>
			<Title order={3}>Identify train</Title>
			<form onSubmit={form.onSubmit((values) => checkTrainExists(values.classNo + values.unitNo))}>
				<TextInput
					placeholder="350 or 43"
					label="Class Number"
					description="Usually the first 2 or 3 digits"
					maxLength={3}
					{...form.getInputProps('classNo')}
					mb={10}
				/>
				<TextInput
					placeholder="101"
					label="Unit Number"
					description="Usually the remaining 3 digits"
					maxLength={3}
					{...form.getInputProps('unitNo')}
					mb={10}
				/>
				<Button type="submit">
					Next
				</Button>
			</form>
		</Card>
	);
}

// Props for the element
interface IdentifyTrainProps {
    onComplete: (rollingStock: any) => void,
}