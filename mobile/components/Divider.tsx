import { View } from "react-native";
import { ShortcutProps, DefaultShortcuts } from "@/styles/shortcuts";

export interface DividerProps extends ShortcutProps {}

export const Divider = (props: DividerProps) => {
  return (
    <View
      style={[
        DefaultShortcuts(props),
        {
          backgroundColor: "lightgray",
          height: 1,
        },
      ]}
    />
  );
};
