import { Anchor, Avatar, Box, Text, Title, Tooltip } from "@mantine/core";
import { OperatorSet, Class, Manufacturer } from "@prisma/client";

export function OperatorSetThumbnail({opSet}: { opSet: OperatorSet }) {
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>

                <Tooltip.Group openDelay={300} closeDelay={100}>
                    <Avatar.Group>
                        <Tooltip label={opSet.class.manufacturer.name} color="dark">
                            <Avatar 
                                component="a"
                                href={"/mf/" + opSet.class.manufacturer.id}
                                src={opSet.class.manufacturer.logoUrl}
                                size={40}>{opSet.class.manufacturer.name.substring(0,2)}</Avatar>
                        </Tooltip>
                        <Tooltip label={opSet.operator.name} color="dark">
                            <Avatar 
                                component="a"
                                href={"/oc/" + opSet.operator.code}
                                src={opSet.operator.logoUrl}
                                size={40}/>
                        </Tooltip>
                    </Avatar.Group>
                </Tooltip.Group>
               
                <Box ml={10}>
                    <Title order={4}>Class {opSet.class.no}</Title>
                    <Text mt={-5}>{opSet._count.rstock} units</Text>
                </Box>
            </div>
            <Anchor href={"/oc/" + opSet.operator.code + "/" + opSet.class.no}>View</Anchor>
        </div>
    )
}

export function ClassThumbnail({classObj, manufacturer}: { classObj: Class, manufacturer: Manufacturer }) {
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Avatar 
                    src={manufacturer.logoUrl}
                    size={40}/>
                <Box pl={10}>
                    <Title order={4}>Class {classObj.no}</Title>
                    <Text mt={-5}>{classObj.model} ({classObj.type})</Text>
                </Box>
            </div>
            <Anchor href={"/mf/" + manufacturer.id + "/" + classObj.no}>View</Anchor>
        </div>
    )
}