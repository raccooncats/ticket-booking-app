import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { HorizontalStack } from "@/components/HorizontalStack";
import { Input } from "@/components/Input";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Text } from "@/components/Text";
import { useState } from "react";
import { VerticalStack } from "@/components/VerticalStack";

const Login = () => {
  const [isAuthMode, setIsAuthMode] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onToggleIsAuthMode = () => {
    setIsAuthMode(isAuthMode => !isAuthMode);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <VerticalStack
          flex={1}
          justifyContent="center"
          alignItems="center"
          p={40}
          gap={40}
        >
          <HorizontalStack gap={10}>
            <Text fontSize={30} bold mb={20}>
              チケット予約
            </Text>
            <TabBarIcon name="ticket" size={36} />
          </HorizontalStack>

          <VerticalStack w={"100%"} gap={30}>
            <VerticalStack gap={5}>
              <Text ml={10} fontSize={14} color="gray">
                メールアドレス
              </Text>
              <Input
                value={email}
                onChangeText={setEmail}
                placeholder="メールアドレス"
                placeholderTextColor="darkgray"
                autoCapitalize="none"
                autoCorrect={false}
                h={48}
                p={14}
              ></Input>
            </VerticalStack>

            <VerticalStack gap={5}>
              <Text ml={10} fontSize={14} color="gray">
                パスワード
              </Text>
              <Input
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="パスワード"
                placeholderTextColor="darkgray"
                autoCapitalize="none"
                autoCorrect={false}
                h={48}
                p={14}
              />
            </VerticalStack>

            {/* Todo: Finish this once we have the Auth Provider */}
            <Button isLoading={false} onPress={() => {}}>
              {isAuthMode ? "ログイン" : "登録"}
            </Button>
          </VerticalStack>

          <Divider w={"90%"} />

          <Text onPress={onToggleIsAuthMode} fontSize={16} underline>
            {isAuthMode ? "新規登録する" : "ログインする"}
          </Text>
        </VerticalStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
