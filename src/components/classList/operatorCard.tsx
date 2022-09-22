import { Anchor, Avatar, Box, Text, Title, Tooltip } from "@mantine/core";
import { Class, Manufacturer } from "@prisma/client";
import { useRouter } from "next/router";

export function OperatorSetThumbnail({ opSet, operator }: { opSet: OperatorSetFull, operator: OperatorFull }) {
    const router = useRouter();
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>

                <Tooltip.Group openDelay={300} closeDelay={100}>
                    <Avatar.Group>
                        <Tooltip label={opSet.class.manufacturer.name} color="dark">
                            <Avatar 
                                component="a"
                                onClick={() => router.push(`/mf/${opSet.class.manufacturer.id}`)}
                                style={{cursor: 'pointer'}}
                                src={opSet.class.manufacturer.logoUrl}
                                size={40}>{opSet.class.manufacturer.name.substring(0,2)}</Avatar>
                        </Tooltip>
                        <Tooltip label={operator.name} color="dark">
                            <Avatar 
                                component="a"
                                onClick={() => router.push(`/op/${operator.code}`)}
                                style={{cursor: 'pointer'}}
                                src={operator.logoUrl}
                                radius="xl"
                                size={40}/>
                        </Tooltip>
                    </Avatar.Group>
                </Tooltip.Group>
               
                <Box ml={10}>
                    <Title order={4}>Class {opSet.class.no}</Title>
                    <Text mt={-5}>{opSet._count.rstock} units</Text>
                </Box>
            </div>
            <Anchor onClick={() => router.push(`/op/${operator.code}/${opSet.class.no}`)}>View</Anchor>
        </div>
    )
}

export function ClassThumbnail({classObj, manufacturer}: { classObj: ClassWithOperators, manufacturer: Manufacturer }) {
    const router = useRouter();
    return (
        <>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Avatar 
                        src={manufacturer.logoUrl}
                        size={40}>{manufacturer.name.substring(0,2)}</Avatar>
                    <Box pl={10}>
                        <Title order={4}>Class {classObj.no}</Title>
                        <Text mt={-5}>{classObj.model} ({classObj.type})</Text>
                    </Box>
                </div>
                <Anchor href={"/mf/" + manufacturer.id + "/" + classObj.no}>View</Anchor>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Text mr={5} mt={6}>Used by</Text>
                <Tooltip.Group openDelay={300} closeDelay={100}>
                    <Avatar.Group mt={10}> 
                        {classObj.operatorSets.map((opSet: OperatorSetFull) => (
                            <Tooltip label={opSet.operator.name} color="dark">
                                <Avatar 
                                    component="a"
                                    onClick={() => router.push(`/op/${opSet.operator.code}`)}
                                    style={{cursor: 'pointer'}}
                                    src={opSet.operator.logoUrl}
                                    radius="xl"
                                    size={30}/>
                            </Tooltip>
                        ))}
                        
                    </Avatar.Group>
                </Tooltip.Group>
            </div>
        </>
    )
}