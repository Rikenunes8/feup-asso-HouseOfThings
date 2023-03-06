import React, { useState } from "react";
import { StyleSheet, Text, View, Switch, Image } from "react-native";
import colors from "../../configs/colors";

export default function DeviceCard({ name, division, enabled }) {
  const [isEnabled, setIsEnabled] = useState(enabled); //TODO
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState); //TODO

  return (
    <View style={styles.deviceCard}>
      <Image
        style={styles.deviceIcon}
        source={require("../../../assets/lightbulb.png")}
      />

      <View style={{ justifyContent: "center" }}>
        <Text style={styles.deviceName}>{name}</Text>
        <Text style={{ color: colors.secondaryText }}>{division}</Text>
      </View>

      <Switch
        trackColor={{ false: colors.desactive, true: colors.active }}
        thumbColor={isEnabled ? colors.white : colors.white}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  deviceCard: {
    width: "85%",
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
});
