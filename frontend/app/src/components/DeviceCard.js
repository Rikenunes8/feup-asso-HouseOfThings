import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  Image,
  TouchableOpacity,
} from "react-native";
import api from "../api/api";
import DetailsModal from "./DetailsModal";
import LightDetails from "./device_details/LightDetails.js";
import colors from "../../configs/colors";

export default function DeviceCard({ name, division, enabled }) {
  const [isEnabled, setIsEnabled] = useState(enabled); //TODO
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false); //TODO
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState); //TODO

  onOfHandler = (isEnabled) => {
    if (isEnabled) {
      console.log("Turning off device...");
      api.actionDevice("1", { action: "turnOff" }); // TODO changing the hardcode "1" to the real device id
    } else {
      console.log("Turning on device...");
      api.actionDevice("1", { action: "turnOn" }); // TODO changing the hardcode "1" to the real device id
    }
  };

  return (
    <TouchableOpacity
      style={styles.deviceCard}
      onPress={() => setIsDetailsModalVisible(!isDetailsModalVisible)}
    >
      <DetailsModal
        title={name}
        subtitle={division}
        modalVisible={isDetailsModalVisible}
        leftIcon="close"
        rightIcon="ellipsis1"
        leftIconCallback={() => setIsDetailsModalVisible(false)}
        rightIconCallback={() => console.log("TODO: Add settings context menu")}
        modalContent={<LightDetails on={isEnabled} onPress={onOfHandler} />}
      />

      <Image
        style={styles.deviceIcon}
        source={require("../../../assets/lightbulb.png")} //TODO: Change this to a dynamic image
      />

      <View style={{ justifyContent: "center" }}>
        <Text style={styles.deviceName}>{name}</Text>
        <Text style={styles.divisionText}>{division}</Text>
      </View>

      <Switch
        trackColor={{ false: colors.desactive, true: colors.active }}
        thumbColor={isEnabled ? colors.white : colors.white}
        onValueChange={() => {
          toggleSwitch();
          onOfHandler(isEnabled);
        }}
        value={isEnabled}
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
