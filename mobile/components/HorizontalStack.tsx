import { Stack, StackProps } from "@/components/Stack";

interface HorizontalStackProps extends StackProps {}

export const HorizontalStack = (props: HorizontalStackProps) => {
  return (
    <Stack {...props} direction="row">
      {props.children}
    </Stack>
  );
};
