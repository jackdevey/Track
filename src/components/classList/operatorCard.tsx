import { Anchor, Avatar, Box, Text, Title } from "@mantine/core";
import { OperatorSet, Class, Manufacturer } from "@prisma/client";

export function OperatorSetThumbnail({opSet}: { opSet: OperatorSet }) {
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Avatar 
                    src={opSet.operator.logoUrl}
                    size={40}/>
                <Box pl={10}>
                    <Title order={4}>Class {opSet.class.no}</Title>
                    <Text mt={-5}>3 units</Text>
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
                    <Text mt={-5}>3 units</Text>
                </Box>
            </div>
            <Anchor href={"/mf/" + manufacturer.id + "/" + classObj.no}>View</Anchor>
        </div>
    )
}