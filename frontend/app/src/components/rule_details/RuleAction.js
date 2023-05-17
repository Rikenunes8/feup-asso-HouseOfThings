import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../../configs/colors";
import Icon from "react-native-vector-icons/Feather";

export default function RuleAction({ device, action }) {
  action = "turn_on";
  action = "turn_off";
  action = "set_brightness";
  action = "set_rgb";
  action = "set_temperature";

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{device.name}</Text>

      <View style={styles.specs}>
        {action === "turn_on" ||
          (action === "turn_off" && (
            <View style={styles.row}>
              <Icon name="power" size={15} color={colors.primaryText} />
              <Text style={styles.text}> {action}</Text>
            </View>
          ))}

        {action === "set_brightness" && (
          <View style={styles.row}>
            <Icon name="sun" size={17} color={colors.primaryText} />
            <Text style={styles.text}> {action}</Text>
          </View>
        )}

        {action === "set_rgb" && (
          <View style={styles.row}>
            <Icon name="droplet" size={17} color={colors.primaryText} />
            <Text style={styles.text}> {action}</Text>
          </View>
        )}

        {action === "set_temperature" && (
          <View style={styles.row}>
            <Icon name="thermometer" size={17} color={colors.primaryText} />
            <Text style={styles.text}> {action}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
    flexWrap: "wrap",
    gap: 10,
  },
  name: {
    fontWeight: "bold",
    color: colors.primaryText,
    marginRight: 15,
  },
  specs: {
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
