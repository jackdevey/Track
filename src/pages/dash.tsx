import { Text, Title } from "@mantine/core";
import { User } from "@prisma/client";
import MainLayout from "../components/MainLayout";

export default function DashPage({ user }: { user: User }) {
  return (
    <MainLayout user={user}>
      <Title order={1}>Dashboard</Title>
    </MainLayout>
  );
}
