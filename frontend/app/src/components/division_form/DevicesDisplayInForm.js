import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import colors from "../../../configs/colors";
import DeviceDisplay from "./DeviceDisplay";
import DevicesContext from "../../contexts/DevicesContext";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

export default function DevicesDisplayInForm() {
  const { devices } = useContext(DevicesContext);

  return (
    <View style={styles.deviceDisplayContainer}>
      <View style={styles.search}>
        <Text style={styles.title}>DEVICES</Text>
        {/* TODO: action of search */}
        <FontAwesome5Icon
          name="search"
          size={16}
          color={colors.primary}
          solid
        />
      </View>

      <View style={styles.devices}>
        {devices.map((device, index) => (
          <DeviceDisplay key={index} device={device} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.primary,
  },
  deviceDisplayContainer: {
    marginTop: 15,
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  search: {
    paddingHorizontal: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  devices: {
    marginTop: 20,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
  },
});
