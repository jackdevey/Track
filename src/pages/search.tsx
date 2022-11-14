import { Avatar, Button, Loader, Text, TextInput } from "@mantine/core";
import { useDebouncedState, useDebouncedValue } from "@mantine/hooks";
import { ModalsProvider, openModal } from "@mantine/modals";
import { SpotlightProvider, openSpotlight, useSpotlight, SpotlightAction } from "@mantine/spotlight";
import { Operator } from "@prisma/client";
import { useEffect, useState } from "react";
import { Building, Dashboard, File, Home, Search, Train } from "tabler-icons-react";
import { trpc } from "../utils/trpc";

export default function SearchPage() {

    const search = trpc.useMutation(["op.search"]);

    const [value, setValue] = useState('');
    const [term] = useDebouncedValue(value, 100);


	let results = false;

    useEffect(() => {
      if (term.length >= 2) {
        search.mutate({term});
      }
    }, [term]);
    
    return(
		<>
			<TextInput defaultValue={value} placeholder="West Midlands Railway" data-autofocus onChange={(event) => setValue(event.currentTarget.value)} />
				{search.isSuccess && search.data.map((d) => 
					<OperatorSearchResult data={d} />
				)}
				

				{search.isLoading && <Loader/>}
		</>

    )
}

function OperatorSearchResult({ data }: { data: Operator }) {

	return (
		<div style={{display: "flex", alignItems: "center"}}>
			<Avatar src={data.logoUrl} radius={50} style={{marginRight: "10px"}}>{data.name}</Avatar>
			<div>
				<Text><b>{data.name}</b></Text>
				<Text style={{marginTop: "-5px"}}>Operator</Text>
			</div>
		</div>
	);
}