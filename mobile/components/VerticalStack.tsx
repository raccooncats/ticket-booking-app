import { Stack, StackProps } from "@/components/Stack";

interface VerticalStackProps extends StackProps {}

export const VerticalStack = (props: VerticalStackProps) => {
  return (
    <Stack {...props} direction="column">
      {props.children}
    </Stack>
  );
};
