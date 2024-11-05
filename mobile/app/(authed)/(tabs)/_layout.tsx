import { ComponentProps } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Href, Tabs } from "expo-router";
import { Text } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types/user";

const TabLayout = () => {
  const { user } = useAuth();

  const tabs = [
    {
      showFor: [UserRole.Attendee, UserRole.Manager],
      name: "(events)",
      displayName: "イベント",
      icon: "calendar",
      options: {
        headerShown: false,
      },
    },
    {
      showFor: [UserRole.Attendee],
      name: "(tickets)",
      displayName: "所有チケット",
      icon: "ticket",
      options: {
        headerShown: false,
      },
    },
    {
      showFor: [UserRole.Manager],
      name: "scan-ticket",
      displayName: "チケット読取り",
      icon: "scan",
      options: {
        headerShown: true,
      },
    },
    {
      showFor: [UserRole.Attendee, UserRole.Manager],
      name: "settings",
      displayName: "設定",
      icon: "cog",
      options: {
        headerShown: true,
      },
    },
  ];

  return (
    <Tabs>
      {tabs.map(tab => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            ...tab.options,
            headerTitle: tab.displayName,
            href: tab.showFor.includes(user?.role!) ? (tab.name as Href) : null,
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? "black" : "gray", fontSize: 12 }}>
                {tab.displayName}
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                name={tab.icon as ComponentProps<typeof Ionicons>["name"]}
                color={focused ? "black" : "gray"}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;
