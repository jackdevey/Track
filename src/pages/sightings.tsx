import {
  Anchor,
  Box,
  Card,
  Chip,
  Code,
  Container,
  createStyles,
  Divider,
  Grid,
  SimpleGrid,
  Skeleton,
  Table,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme,
} from "@mantine/core";
import type { GetServerSideProps } from "next";
import { User } from "next-auth";
import { useRouter } from "next/router";
import { Clock, Location } from "tabler-icons-react";
import { AuthGuardUI } from "../components/authGuard";
import { HeaderMiddle } from "../components/headerMiddle";
import MainLayout from "../components/MainLayout";
import { MainPageLoading, SubPageLoading } from "../components/mainPageLoading";
import SightingBlock from "../components/sightingCard";
import { trpc } from "../utils/trpc";

const PRIMARY_COL_HEIGHT = 300;

export default function Home({ user }: { user: User }) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;
  const router = useRouter();

  // Get the list of sightings
  const { data, isLoading } = trpc.useQuery(["si.getAll", { take: 10 }]);
  if (!data) return <SubPageLoading user={user} />;

  return (
    <MainLayout user={user}>
      <Title order={1} mb={"lg"}>
        Sightings
      </Title>

      <Card p={0} withBorder>
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Locations</th>
              <th>Rolling Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((sighting: SightingForList) => (
              <tr>
                <td>{sighting.date.toDateString()}</td>
                <td>{sighting.location}</td>
                <td>
                  <Chip.Group spacing="sm">
                    {sighting.rStockSightings.map(
                      (rs: RStockSightingWithRstock, i: number) => (
                        <>
                          <Chip
                            radius="sm"
                            p={0}
                            style={{ cursor: "pointer" }}
                            checked={rs.userFirst}
                            onClick={() =>
                              router.push("/rs/" + rs.rstock.identifier)
                            }
                          >
                            {rs.rstock.identifier}
                          </Chip>
                        </>
                      )
                    )}
                  </Chip.Group>
                </td>
                <td>View</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </MainLayout>
  );
}

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark![6]
        : theme.colors.gray![0],
    borderBottom: `1px solid ${
      theme.colorScheme === "dark"
        ? theme.colors.dark![5]
        : theme.colors.gray![2]
    }`,
  },

  headerText: {
    paddingTop: 50,
    paddingBottom: 40,
  },

  titleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    [theme.fn.smallerThan("sm")]: {
      justifyContent: "flex-start",
    },
  },
}));

// Use authGuard for UI
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return await AuthGuardUI(req, res);
};
