import { Box, Container, createStyles, Text, Title } from "@mantine/core";

export function DoubleTitle({ title, subtitle }: { title: string; subtitle: string }) {
    // Get styles
    const { classes } = useStyles();
    // Return element
    return <Box className={classes.header}>
        <Container size={"xl"}>
            <div className={classes.headerText}>
                <Title>{title}</Title>
                <Text>{subtitle}</Text>
            </div>
        </Container>
    </Box>;
}

const useStyles = createStyles((theme) => ({
    header: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark![6] : theme.colors.gray![0],
        borderBottom: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark![5] : theme.colors.gray![2]
        }`,
    },

    headerText: {
        paddingTop: 50,
        paddingBottom: 40,
    }
}));