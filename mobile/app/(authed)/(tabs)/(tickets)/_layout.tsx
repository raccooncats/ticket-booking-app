import { Stack } from "expo-router";

const TicketsLayout = () => {
  return (
    <Stack screenOptions={{ headerBackTitle: "チケット一覧" }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="ticket/[id]" />
    </Stack>
  );
};

export default TicketsLayout;
