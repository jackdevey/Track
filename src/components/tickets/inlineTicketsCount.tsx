import { Badge, Tooltip } from "@mantine/core";

export default function InlineTicketsCount({ count }: { count: number }) {
    return <>
        <Badge style={{alignSelf: 'center'}} variant="dot" color="orange">+{count}</Badge>
    </>
}