import { Alert } from "react-native";
import { Button } from "@/components/Button";
import { DateTimePicker } from "@/components/DateTimePicker";
import { eventService } from "@/services/event";
import { Input } from "@/components/Input";
import { router, useNavigation } from "expo-router";
import { Text } from "@/components/Text";
import { useEffect, useState } from "react";
import { VerticalStack } from "@/components/VerticalStack";

const NewEvent = () => {
  const navigation = useNavigation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());

  const onChangeDate = (date?: Date) => {
    setDate(date || new Date());
  };

  const onSubmit = async () => {
    try {
      setIsSubmitting(true);

      await eventService.createOne(name, location, date.toISOString());
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to create event");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({ headerTitle: "新規イベント" });
  }, []);

  return (
    <VerticalStack m={20} flex={1} gap={30}>
      <VerticalStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">
          イベント名
        </Text>
        <Input
          value={name}
          onChangeText={setName}
          placeholder="イベント名"
          placeholderTextColor="darkgray"
          h={48}
          p={14}
        />
      </VerticalStack>

      <VerticalStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">
          開催場所
        </Text>
        <Input
          value={location}
          onChangeText={setLocation}
          placeholder="開催場所"
          placeholderTextColor="darkgray"
          h={48}
          p={14}
        />
      </VerticalStack>

      <VerticalStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">
          開催日時
        </Text>
        <DateTimePicker onChange={onChangeDate} currentDate={date} />
      </VerticalStack>

      <Button
        mt={"auto"}
        isLoading={isSubmitting}
        disabled={isSubmitting}
        onPress={onSubmit}
      >
        保存
      </Button>
    </VerticalStack>
  );
};

export default NewEvent;
