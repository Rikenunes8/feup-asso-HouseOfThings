import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import colors from "../../../configs/colors";
import DeviceDisplay from "./DeviceDisplay";
import DevicesContext from "../../contexts/DevicesContext";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

export default function DevicesDisplayInForm() {
  const { devices } = useContext(DevicesContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.field}>DEVICES</Text>
        {/* TODO: action of search */}
        <FontAwesome5Icon name="search" size={15} color={colors.primary} />
      </View>

      <View style={styles.list}>
        {devices.map((device, index) => (
          <DeviceDisplay key={index} device={device} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  field: {
    color: colors.primary,
  },
  list: {
    paddingVertical: 15,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
