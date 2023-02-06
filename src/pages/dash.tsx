import { Text } from "@mantine/core";
import { User } from "@prisma/client";
import MainLayout from "../components/MainLayout";

export default function DashPage({ user }: { user: User }) {
  return (
    <MainLayout user={user}>
      <Text>Dashboard stuff goes here</Text>
    </MainLayout>
  );
}
