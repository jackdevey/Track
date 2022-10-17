import { HeaderMiddle } from "./headerMiddle";
import { Box, Container, Skeleton, createStyles } from "@mantine/core";
import { User } from "next-auth";


export function MainPageLoading({user}: {user:User}) {

    const { classes } = useStyles();

    return <>
        <HeaderMiddle user={user}/>
        <Box className={classes.header}>
            <Container>
                <div className={classes.headerText}>
                    <Skeleton height={40} width="30%" />
                    <Skeleton height={20} mt={6} width="10%" />
                </div>
            </Container>
        </Box>
    </>
}

export function SubPageLoading({user}: {user:User}) {

    const { classes } = useStyles();

    return <>
        <HeaderMiddle user={user}/>
        <Box className={classes.header}>
            <Container>
                <div className={classes.headerText}>
                    <Skeleton height={40} width="30%" />
                </div>
            </Container>
        </Box>
    </>
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