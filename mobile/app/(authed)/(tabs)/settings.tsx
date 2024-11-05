import { Button } from "@/components/Button";
import { VerticalStack } from "@/components/VerticalStack";
import { useAuth } from "@/context/AuthContext";

const SettingsScreen = () => {
  const { logout } = useAuth();

  return (
    <VerticalStack flex={1} m={20}>
      <Button onPress={logout}>ログアウト</Button>
    </VerticalStack>
  );
};

export default SettingsScreen;
