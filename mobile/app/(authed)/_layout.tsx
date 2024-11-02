import { Redirect, Stack } from "expo-router";

const AppLayout = () => {
  const isLoggedIn = true;

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AppLayout;
