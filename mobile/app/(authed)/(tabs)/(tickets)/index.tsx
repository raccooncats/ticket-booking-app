import { Alert, FlatList, TouchableOpacity } from "react-native";
import { router, useNavigation } from "expo-router";
import { Ticket } from "@/types/ticket";
import { ticketService } from "@/services/ticket";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { VerticalStack } from "@/components/VerticalStack";
import { HorizontalStack } from "@/components/HorizontalStack";
import { Text } from "@/components/Text";

const TicketsIndex = () => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const onGoToTicketPage = (id: number) => {
    router.push(`/(tickets)/ticket/${id}`);
  };

  const fetchTickets = async () => {
    try {
      setIsLoading(true);
      const response = await ticketService.getAll();
      setTickets(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch tickets");
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTickets();
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({ headerTitle: "チケット一覧" });
  }, [navigation]);

  return (
    <VerticalStack flex={1} p={20} pb={0} gap={20}>
      <HorizontalStack alignItems="center" justifyContent="center">
        <Text fontSize={18} bold>
          {tickets.length} 枚
        </Text>
      </HorizontalStack>

      <FlatList
        keyExtractor={({ id }) => id.toString()}
        data={tickets}
        onRefresh={fetchTickets}
        refreshing={isLoading}
        renderItem={({ item: ticket }) => (
          <TouchableOpacity
            disabled={ticket.entered}
            onPress={() => onGoToTicketPage(ticket.id)}
          >
            <VerticalStack
              gap={20}
              h={120}
              key={ticket.id}
              style={{ opacity: ticket.entered ? 0.5 : 1 }}
            >
              <HorizontalStack>
                <VerticalStack
                  h={120}
                  w={"69%"}
                  p={20}
                  justifyContent="space-between"
                  style={{
                    backgroundColor: "white",
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 20,
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                  }}
                >
                  <HorizontalStack alignItems="center">
                    <Text fontSize={22} bold>
                      {ticket.event.name}
                    </Text>
                  </HorizontalStack>
                  <Text fontSize={16} bold>
                    {ticket.event.location}
                  </Text>
                  <Text fontSize={12}>
                    {new Date(ticket.event.date).toLocaleString()}
                  </Text>
                </VerticalStack>

                <VerticalStack
                  h={110}
                  w={"1%"}
                  style={{
                    alignSelf: "center",
                    borderColor: "lightgray",
                    borderWidth: 2,
                    borderStyle: "dashed",
                  }}
                />

                <VerticalStack
                  h={120}
                  w={"29%"}
                  justifyContent="center"
                  alignItems="center"
                  style={{
                    backgroundColor: "white",
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                  }}
                >
                  <Text fontSize={16} bold>
                    {ticket.entered ? "使用済み" : "未使用"}
                  </Text>
                  {ticket.entered && (
                    <Text mt={12} fontSize={10}>
                      {new Date(ticket.updatedAt).toLocaleString()}
                    </Text>
                  )}
                </VerticalStack>
              </HorizontalStack>
            </VerticalStack>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <VerticalStack h={20} />}
      />
    </VerticalStack>
  );
};

export default TicketsIndex;
