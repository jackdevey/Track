import { Anchor, Code, Text } from "@mantine/core"
import { Clock, Location } from "tabler-icons-react"
import { useRouter } from "next/router"
import { RstockSighting } from "@prisma/client";

export default function SightingBlock({ sighting }: SightingBlockProps) {

    const router = useRouter();

    const stockList = sighting.rStockSightings.map((rs: RStockSightingWithRstock, i: number) => 
        <>
            <b>{rs.rstock.identifier}</b>
            {i != sighting.rStockSightings.length - 1 && <span>, </span>}
        </>
    )

    return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div>
            <Text>{stockList}</Text>
            <Text><Location size={16} style={{marginRight: 5}}/>{sighting.location}</Text>
            <Text><Clock size={16} style={{marginRight: 5}}/>{sighting.date.toDateString()}</Text>
        </div>
        <Anchor onClick={() => router.push("/rs/350101")}>View</Anchor>
    </div>
}


interface SightingBlockProps {
    sighting: SightingForList
}