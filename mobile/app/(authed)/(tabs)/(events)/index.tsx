import { Alert, FlatList, TouchableOpacity } from "react-native";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Event } from "@/types/event";
import { eventService } from "@/services/event";
import { HorizontalStack } from "@/components/HorizontalStack";
import { router, useNavigation } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Text } from "@/components/Text";
import { useAuth } from "@/context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { UserRole } from "@/types/user";
import { VerticalStack } from "@/components/VerticalStack";

const EventsIndex = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onGoToEventPage = (id: number) => {
    if (user?.role === UserRole.Manager) {
      router.push(`/(events)/event/${id}`);
    }
  };

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await eventService.getAll();
      setEvents(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch events");
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchEvents();
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "イベント一覧",
      headerRight: user?.role === UserRole.Manager ? headerRight : null,
    });
  }, [navigation, user]);

  return (
    <VerticalStack flex={1} p={20} pb={0} gap={20}>
      <HorizontalStack alignItems="center" justifyContent="center">
        <Text fontSize={18} bold>
          {events.length} イベント
        </Text>
      </HorizontalStack>

      <FlatList
        data={events}
        onRefresh={fetchEvents}
        refreshing={isLoading}
        ItemSeparatorComponent={() => <VerticalStack h={20} />}
        renderItem={({ item: event }) => (
          <VerticalStack
            gap={20}
            p={20}
            style={{
              backgroundColor: "white",
              borderRadius: 20,
            }}
            key={event.id}
          >
            <TouchableOpacity onPress={() => onGoToEventPage(event.id)}>
              <HorizontalStack
                alignItems="center"
                justifyContent="space-between"
              >
                <HorizontalStack alignItems="center">
                  <Text fontSize={16} bold>
                    {event.name}
                  </Text>
                  <Text fontSize={16} bold>
                    {" "}
                    |{" "}
                  </Text>
                  <Text fontSize={16} bold>
                    {event.location}
                  </Text>
                </HorizontalStack>
                {user?.role === UserRole.Manager && (
                  <TabBarIcon size={20} name="chevron-forward" />
                )}
              </HorizontalStack>
            </TouchableOpacity>

            <Divider />

            <HorizontalStack justifyContent="space-between">
              <Text bold fontSize={16} color="gray">
                発行数: {event.totalTicketsPurchased}
              </Text>
              <Text bold fontSize={16} color="green">
                使用済み: {event.totalTicketsEntered}
              </Text>
            </HorizontalStack>

            {user?.role === UserRole.Attendee && (
              <VerticalStack>
                <Button
                  variant="outlined"
                  disabled={isLoading}
                  onPress={() => {}}
                >
                  チケットを購入する
                </Button>
              </VerticalStack>
            )}

            <Text fontSize={13} color="gray">
              {new Date(event.date).toLocaleString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </Text>
          </VerticalStack>
        )}
      />
    </VerticalStack>
  );
};

const headerRight = () => {
  return (
    <TabBarIcon
      size={28}
      name="add-circle-outline"
      onPress={() => router.push("/(events)/new")}
    />
  );
};

export default EventsIndex;
