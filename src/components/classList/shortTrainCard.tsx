import { Button, Card, Title, Text, Checkbox, ThemeIcon } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, CircleCheck, CircleDashed } from "tabler-icons-react";

export default function ShortTrainCard({ userSeen, identifier, formation, carCount }: ShortTrain) {

    const [seen, setSeen] = useState(userSeen);

    return (
        <Card withBorder style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex'}}>
                {userSeen && (
                    <ThemeIcon radius="md" mr={10}>
                        <CircleCheck size={18} />
                    </ThemeIcon>
                )}
                {!userSeen && (
                    <ThemeIcon radius="md" mr={10} color="gray">
                        <CircleDashed size={18} />
                    </ThemeIcon>
                )}
                <Title order={4}>{identifier}</Title>
            </div>
            <Text>{formation}</Text>
            <Text>{carCount} carriages</Text>
            <Link href={"/rstock/"+identifier}>
                <Button rightIcon={<ArrowRight />} compact>View unit</Button>
            </Link>
        </Card>
    );
}

interface ShortTrain {
    userSeen: boolean
    identifier: string;
    formation: string;
    carCount: number;
}