import { Alert } from "react-native";
import { Button } from "@/components/Button";
import { DateTimePicker } from "@/components/DateTimePicker";
import { Event } from "@/types/event";
import { eventService } from "@/services/event";
import { Input } from "@/components/Input";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Text } from "@/components/Text";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { VerticalStack } from "@/components/VerticalStack";

const EventDetail = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventData, setEventData] = useState<Event | null>(null);

  const updateField = (field: keyof Event, value: string | Date) => {
    setEventData(prevState => ({
      ...prevState!,
      [field]: value,
    }));
  };

  const onDelete = useCallback(() => {
    if (!eventData) return;

    try {
      Alert.alert("イベント削除", "イベントを削除してもよろしいでしょうか？", [
        { text: "キャンセル" },
        {
          text: "削除",
          onPress: async () => {
            await eventService.deleteOne(Number(id));
            router.back();
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to delete event");
    }
  }, [eventData, id]);

  const onSubmitChanges = async () => {
    if (!eventData) return;

    try {
      setIsSubmitting(true);

      await eventService.updateOne(
        Number(id),
        eventData.name,
        eventData.location,
        eventData.date
      );
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to update event");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchEvent = async () => {
    try {
      const response = await eventService.getOne(Number(id));
      setEventData(response.data);
    } catch (error) {
      router.back();
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchEvent();
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerRight: () => headerRight(onDelete),
    });
  }, [navigation, onDelete]);

  return (
    <VerticalStack m={20} flex={1} gap={30}>
      <VerticalStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">
          イベント名
        </Text>
        <Input
          value={eventData?.name || ""}
          onChangeText={value => updateField("name", value)}
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
          value={eventData?.location || ""}
          onChangeText={value => updateField("location", value)}
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
        <DateTimePicker
          onChange={date => updateField("date", date || new Date())}
          currentDate={new Date(eventData?.date || new Date())}
        />
      </VerticalStack>

      <Button
        mt={"auto"}
        isLoading={isSubmitting}
        disabled={isSubmitting}
        onPress={onSubmitChanges}
      >
        更新
      </Button>
    </VerticalStack>
  );
};

const headerRight = (onPress: VoidFunction) => {
  return <TabBarIcon size={28} name="trash" onPress={onPress} />;
};

export default EventDetail;
