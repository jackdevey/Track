import { Anchor, Chip, Code, Text } from "@mantine/core"
import { Clock, Location } from "tabler-icons-react"
import { useRouter } from "next/router"
import { RstockSighting } from "@prisma/client";
import { ChipGroup } from "@mantine/core/lib/Chip/ChipGroup/ChipGroup";

export default function SightingBlock({ sighting, hasChips = true }: SightingBlockProps) {

    const router = useRouter();

    const stockList = sighting.rStockSightings.map((rs: RStockSightingWithRstock, i: number) => 
        <>
            <Chip 
                radius="sm"
                style={{cursor: "pointer"}}
                checked={rs.userFirst}
                onClick={() => router.push("/rs/" + rs.rstock.identifier)}>
                {rs.rstock.identifier}
            </Chip>
        </>
    )

    return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div>
            <Text><b>{sighting.location}</b></Text>
            <Text>{sighting.date.toDateString()}</Text>
            {hasChips && <Chip.Group spacing="sm" mt={5}>{stockList}</Chip.Group>}
        </div>
        <Anchor onClick={() => router.push("/rs/350101")}>View</Anchor>
    </div>
}


interface SightingBlockProps {
    sighting: SightingForList
    hasChips: Boolean
}