import { useState } from 'react';
import { Box, createStyles, Header, Group, Code, ActionIcon, Container, Burger, Title, Text, Button, Input, TextInput, Menu, UnstyledButton, Avatar, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { Book2, ChevronDown, Logout, Search, Settings, User as UserIcon } from 'tabler-icons-react';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,

    
  },

  links: {
    width: 260,

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  social: {
    width: 260,

    [theme.fn.smallerThan('sm')]: {
      width: 'auto',
      marginLeft: 'auto',
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },

  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },
  },

  userName: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },
}));

interface HeaderMiddleProps {
  links: { link: string; label: string }[];
}

export function HeaderMiddle({ user }: {user: User|null}) {
  const { classes, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  console.log(user);
  const router = useRouter();

  return (
    <Header height={56}>
        <Box className={classes.inner} px={"md"}>
            <Link href="/">
              <div>
                <Title order={2} align="center" style={{cursor: "pointer"}}>🚅 Track</Title> 
              </div>
            </Link>

            {/* <TextInput
              icon={<Search size={18}/>}
              placeholder="Search"/> */}

<Menu
            width={260}
            position="bottom-end"
            transition="pop-top-right"
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
              >
                <Group spacing={7}>
                  <Avatar src={user?.image} alt={user?.name as string} radius="xl" size={20} />
                  <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3} className={classes.userName}>
                    {user?.name as string}
                  </Text>
                  <ChevronDown size={12} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<Book2 size={16}/>} onClick={() => router.push("/sightings")}>Your Sightings</Menu.Item>
              <Menu.Item icon={<UserIcon size={16}/>} onClick={() => router.push("/account")}>Your Account</Menu.Item>
              <Menu.Item icon={<Settings size={16}/>} onClick={() => router.push("/settings")}>Settings</Menu.Item>
              <Menu.Divider/>
              <Menu.Item icon={<Logout size={16}/>} onClick={() => signOut()}>Logout</Menu.Item>

            </Menu.Dropdown>
          </Menu>
        </Box>
    </Header>
  );
}