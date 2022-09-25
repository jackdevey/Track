import { Anchor, createStyles, Text } from "@mantine/core";
import { useRouter } from "next/router";

export function AttributePoint({ name, value, href }: AttributePointProps) {
    // Use router
    const router = useRouter();
    // Use styles
    const { classes } = useStyles();

    let valueElement = <Text>{value}</Text>;
    if (href) valueElement = <Anchor onClick={() => router.push(href)}>{value}</Anchor>

    return <>
        <div className={classes.attributePoint}>
            <Text><b>{name}</b></Text>
            {valueElement}
        </div>
    </>
}

const useStyles = createStyles((theme) => ({
    attributePoint: {
        display: 'flex',
        // For mobile
        [theme.fn.smallerThan('sm')]: {
            justifyContent: 'flex-start',
            flexDirection: 'column',
            alignItems: 'left'
        },
        // For desktop
        [theme.fn.largerThan('sm')]: {
            justifyContent: 'space-between',
            alignItems: 'center'
        },
    }
}));

interface AttributePointProps { 
    name: string, 
    value: string,
    href?: string
}