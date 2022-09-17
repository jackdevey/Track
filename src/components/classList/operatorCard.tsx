import { Avatar, Button, Card, Divider, RingProgress, Space, Title } from "@mantine/core";
import Link from "next/link";
import internal from "stream";
import { ArrowRight } from "tabler-icons-react";

export default function OperatorCard({ 
    opName,
    opCode,
    opLogoUrl, 
    unitsMax, 
    unitsUserLogged,
    rStockClassNo, 
    rStockGraphicUrl 
}: OperatorClass) {

    const percentLogged = Math.floor(unitsUserLogged / unitsMax * 100)

    return (
        <Card withBorder>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <RingProgress
                        size={100}
                        thickness={8}         
                        label={<Title order={5} align="center">{percentLogged}%</Title>}
                        sections={[{ value: percentLogged, color: 'blue' }]}/>
                    <Space w="sm" />
                    <div>
                        <Title order={2}>{opName}</Title>
                        <Title order={4}>{unitsUserLogged} of {unitsMax} units</Title>
                    </div>
                </div>
                <Avatar
                    size="xl"
                    variant="outline"
                    src={opLogoUrl}/>
            </div>
            <Divider mt={10} mb={10}/>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img 
                    src={rStockGraphicUrl}
                    height="30"
                    style={{marginTop: 5}}/>
                <Link href={`${rStockClassNo}/${opCode}`}>
                    <Button rightIcon={<ArrowRight />}>
                        View units
                    </Button>
                </Link>
            </div>
        </Card>
    )
}

interface OperatorClass {
    opName: string;
    opCode: string;
    opLogoUrl: string;
    unitsMax: number;
    unitsUserLogged: number;
    rStockClassNo: string;
    rStockGraphicUrl: string;
}