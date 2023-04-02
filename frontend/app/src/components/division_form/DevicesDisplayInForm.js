import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import api from "../../api/api";
import colors from "../../../configs/colors";
import DeviceDisplay from "./DeviceDisplay";

export default function DevicesDisplayInForm() {

  devices=[{name: "Philips", group: "Family Room"}]

  return (
    <View
      style={styles.deviceDisplayContainer}
    >
        <Text style={styles.title}>DEVICES</Text>

        {devices.map((device) => (
          <DeviceDisplay deviceName={device.name} deviceGroup={device.group} />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.primary
  },
  deviceDisplayContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: colors.white,
    margin: 10,
    padding: 10,
  }
});
