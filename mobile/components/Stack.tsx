import { PropsWithChildren } from "react";
import { DefaultShortcuts, ShortcutProps } from "@/styles/shortcuts";
import { View, ViewProps } from "react-native";

export interface StackProps
  extends PropsWithChildren,
    ShortcutProps,
    ViewProps {
  flex?: number;
  direction?: "row" | "column";
  gap?: number;
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
}

export const Stack = ({
  flex,
  direction,
  gap,
  alignItems,
  justifyContent,
  children,
  style,
  ...restProps
}: StackProps) => {
  return (
    <View
      style={[
        DefaultShortcuts(restProps),
        { flex, flexDirection: direction, gap, alignItems, justifyContent },
        style,
      ]}
      {...restProps}
    >
      {children}
    </View>
  );
};
