import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  Image,
  TouchableOpacity,
} from "react-native";

import DevicesContext from "../contexts/DevicesContext";
import ModalsContext from "../contexts/ModalsContext";
import DeviceDetailsModal from "../screens/modals/DeviceDetailsModal";

import api from "../api/api";
import colors from "../../configs/colors";

export default function DeviceCard({ device }) {
  const { updateDevice } = useContext(DevicesContext);
  const { deviceDetailsModalVisible, setDeviceDetailsModalVisible } =
    useContext(ModalsContext);

  onOfHandler = (isEnabled) => {
    console.log(`Turning ${isEnabled ? "off" : "on"} device...`);

    const action = isEnabled ? "turnOff" : "turnOn";
    api.actionDevice(device.uid, { action: action });
    updateDevice({ on: !device.on }, device.uid);
  };

  return (
    <TouchableOpacity
      style={styles.deviceCard}
      onPress={() => setDeviceDetailsModalVisible(!deviceDetailsModalVisible)}
    >
      <DeviceDetailsModal device={device} />

      <Image
        style={styles.deviceIcon}
        source={require("../../../assets/lightbulb.png")} //TODO: Change this to a dynamic image
      />

      <View style={{ justifyContent: "center" }}>
        <Text style={styles.deviceName}>{device.name}</Text>
        <Text style={styles.divisionText}>{device.divisions[0]}</Text>
      </View>

      <Switch
        trackColor={{ false: colors.desactive, true: colors.active }}
        thumbColor={device.on ? colors.white : colors.white}
        onValueChange={() => {
          onOfHandler(device.on);
        }}
        value={device.on}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deviceCard: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: colors.white,
    borderRadius: 15,
    marginVertical: 10,
    padding: 10,
  },
  deviceIcon: {
    width: 50,
    height: 50,
    objectFit: "contain",
  },
  deviceName: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.primaryText,
  },
  divisionText: {
    color: colors.secondaryText,
    textTransform: "capitalize",
  },
});
