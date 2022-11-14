import { Avatar, Button, Code, Divider, Loader, Text, TextInput, Title, Anchor, Box, Container, Card } from "@mantine/core";
import { useDebouncedState, useDebouncedValue } from "@mantine/hooks";
import { ModalsProvider, openModal } from "@mantine/modals";
import { SpotlightProvider, openSpotlight, useSpotlight, SpotlightAction } from "@mantine/spotlight";
import { Manufacturer, Operator } from "@prisma/client";
import { KeyboardEvent, useEffect, useState } from "react";
import { Building, Dashboard, Divide, File, Home, Search, Train } from "tabler-icons-react";
import { search } from "../server/op/search";
import { SearchResults } from "../server/search";
import { trpc } from "../utils/trpc";

const emptyResults: SearchResults = {
	op: [],
	mf: []
}

export default function SearchPage() {

    const search = trpc.useMutation(["search"]);

    const [value, setValue] = useState('');
    const [term] = useDebouncedValue(value, 100);

	let [firstSearch, setFirstSearch] = useState(true);


    useEffect(() => {
		// If more than 2 chars, send search request
      	if (term.length >= 2) search.mutate({term});
		if (firstSearch == true) setFirstSearch(false);
    }, [term]);

	// When search values are changed !not debounced!
	useEffect(() => {
		// When no search term, clear search results
		if (value == "") setSearchBuffer(emptyResults);
    }, [value]);

	// Establish a buffer of old search results
	// to make sure the user doesn't see a blank page
	const [searchBuffer, setSearchBuffer] = useState<SearchResults>(emptyResults);
	useEffect(() => {
		// When a search is successful overwrite the buffer
		if (search.isSuccess) setSearchBuffer(search.data);
    }, [search.data]);
    
    return(
		<>
			<Container size={"sm"}>
				<TextInput 
					defaultValue={value} 
					placeholder="West Midlands Railway" 
					data-autofocus 
					onChange={(event) => setValue(event.currentTarget.value)}
				/>
				<Card shadow="sm" withBorder>
					{searchBuffer.op.length > 0 && searchBuffer.op.map((d: Operator, i: number) => <>
						<OperatorSearchResult data={d} />
						{i != searchBuffer.op.length - 1 && <Divider my={10}/>}
					</>)}
					{searchBuffer.mf.length > 0 && searchBuffer.mf.map((d: Manufacturer, i: number) => <>
						<ManufacturerSearchResult data={d} />
						{i != searchBuffer.mf.length - 1 && <Divider my={10}/>}
					</>)}
				</Card>
			</Container>
		</>

    )
}

function OperatorSearchResult({ data }: { data: Operator }) {

	return (
		<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
			<div style={{display: 'flex', alignItems: 'center'}}>
				<Avatar 
					src={data.logoUrl}
					size={40}
					radius={50}>{data.name.substring(0,2)}</Avatar>
				<Box pl={10}>
					<Title order={4}>{data.name}</Title>
					<Text mt={-5}>Operator</Text>
				</Box>
			</div>
			<Anchor href={"/op/" + data.code}>View</Anchor>
		</div>
	);
}

function ManufacturerSearchResult({ data }: { data: Manufacturer }) {

	return (
		<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
			<div style={{display: 'flex', alignItems: 'center'}}>
				<Avatar 
					src={data.logoUrl}
					size={40}>{data.name.substring(0,2)}</Avatar>
				<Box pl={10}>
					<Title order={4}>{data.name}</Title>
					<Text mt={-5}>Manufacturer</Text>
				</Box>
			</div>
			<Anchor href={"/mf/" + data.id}>View</Anchor>
		</div>
	);
}