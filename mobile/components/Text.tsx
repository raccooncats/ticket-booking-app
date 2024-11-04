import { Text as RNText, TextProps } from "react-native";
import { PropsWithChildren } from "react";
import { ShortcutProps, DefaultShortcuts } from "@/styles/shortcuts";

export interface CustomTextProps
  extends PropsWithChildren,
    ShortcutProps,
    TextProps {
  fontSize?: number;
  bold?: boolean;
  underline?: boolean;
  color?: string;
}

export const Text = ({
  fontSize = 18,
  bold,
  underline,
  color,
  children,
  ...restProps
}: CustomTextProps) => {
  return (
    <RNText
      style={[
        DefaultShortcuts(restProps),
        {
          fontSize,
          fontWeight: bold ? "bold" : "normal",
          textDecorationLine: underline ? "underline" : "none",
          color,
        },
      ]}
      {...restProps}
    >
      {children}
    </RNText>
  );
};
