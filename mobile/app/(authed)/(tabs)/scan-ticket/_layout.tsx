import { ActivityIndicator, Alert, Vibration } from "react-native";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { useState } from "react";
import { VerticalStack } from "@/components/VerticalStack";
import { ticketService } from "@/services/ticket";

const ScanTicketLayout = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanningEnabled, setScanningEnabled] = useState(true);

  if (!permission) {
    return (
      <VerticalStack flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size={"large"} />
      </VerticalStack>
    );
  }

  if (!permission.granted) {
    return (
      <VerticalStack
        gap={20}
        flex={1}
        justifyContent="center"
        alignItems="center"
      >
        <Text>Camera access is required to scan tickets.</Text>
        <Button onPress={requestPermission}>Allow Camera Access</Button>
      </VerticalStack>
    );
  }

  const onBarcodeScanned = async ({ data }: BarcodeScanningResult) => {
    if (!scanningEnabled) return;

    try {
      Vibration.vibrate();
      setScanningEnabled(false);

      const [ticket, owner] = data.split(",");
      const ticketId = parseInt(ticket.split(":")[1]);
      const ownerId = parseInt(owner.split(":")[1]);

      await ticketService.validateOne(ticketId, ownerId);

      Alert.alert("成功", "チケットは正常に認証されました。", [
        { text: "OK", onPress: () => setScanningEnabled(true) },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to validate ticket. Please try again.");
      setScanningEnabled(true);
    }
  };

  return (
    <CameraView
      style={{ flex: 1 }}
      facing="back"
      onBarcodeScanned={onBarcodeScanned}
      barcodeScannerSettings={{
        barcodeTypes: ["qr"],
      }}
    />
  );
};

export default ScanTicketLayout;
