import { useEffect } from "react";
import { useNavigation } from "expo-router";

export const useOnScreenListener = (
  eventType: "focus" | "blur" | "state" | "beforeRemove",
  callback: VoidFunction
) => {
  const navigation = useNavigation();

  useEffect(() => {
    const subscribe = navigation.addListener(eventType, callback);
    return subscribe;
  }, [navigation, callback, eventType]);
};
