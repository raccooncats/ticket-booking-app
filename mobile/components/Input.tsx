import { ShortcutProps, DefaultShortcuts } from "@/styles/shortcuts";
import { TextInput, TextInputProps } from "react-native";

interface InputProps extends ShortcutProps, TextInputProps {}

export function Input(props: InputProps) {
  return (
    <TextInput
      style={[
        DefaultShortcuts(props),
        {
          fontSize: 16,
          borderRadius: 16,
          backgroundColor: "lightgray",
          color: "black",
        },
      ]}
      {...props}
    />
  );
}