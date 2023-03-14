import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  Image,
  TouchableOpacity,
} from "react-native";

import DetailsModal from "./DetailsModal";
import LightDetails from "./device_details/light/LightDetails.js";
import LightDetailsContextMenu from "./device_details/light/LightDetailsContextMenu";
import DevicesContext from "../contexts/DevicesContext";

import api from "../api/api";
import colors from "../../configs/colors";

export default function DeviceCard({ device }) {
  const { updateDevice } = useContext(DevicesContext);

  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  onOfHandler = (isEnabled) => {
    console.log(`Turning ${isEnabled ? "off" : "on"} device...`);

    const action = isEnabled ? "turnOff" : "turnOn";
    api.actionDevice(device.uid, { action: action });
    updateDevice({ on: !device.on }, device.uid);
  };

  return (
    <TouchableOpacity
      style={styles.deviceCard}
      onPress={() => setIsDetailsModalVisible(!isDetailsModalVisible)}
    >
      <DetailsModal
        title={device.name || "Philips Bulb"}
        subtitle={device.division || "Living Room"}
        modalVisible={isDetailsModalVisible}
        leftIcon="close"
        rightIcon="ellipsis1"
        leftIconCallback={() => {setIsDetailsModalVisible(false); setIsContextMenuVisible(false)}}
        rightIconCallback={() => setIsContextMenuVisible(!isContextMenuVisible)}
        contextMenu={
          // TODO: Change this to a dynamic component (depending on device type)
          <LightDetailsContextMenu
            setIsDetailsModalVisible={setIsDetailsModalVisible}
            isContextMenuVisible={isContextMenuVisible}
            setIsContextMenuVisible={setIsContextMenuVisible}
            deviceContextMenuUid={device.uid}
          />
        }
        modalContent={
          // TODO: Change this to a dynamic component (depending on device type)
          <LightDetails on={device.on} handler={onOfHandler} />
        } 
      />

      <Image
        style={styles.deviceIcon}
        source={require("../../../assets/lightbulb.png")} //TODO: Change this to a dynamic image
      />

      <View style={{ justifyContent: "center" }}>
        <Text style={styles.deviceName}>{device.name || "Philips Bulb"}</Text>
        <Text style={styles.divisionText}>
          {device.division || "Living Room"}
        </Text>
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
  },
});
