import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import colors from "../../../../configs/colors";

export default function DeviceAction({ device, action, data }) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{device.name}</Text>

      <View style={styles.specs}>
        {action === "turn_on" && (
          <View style={styles.row}>
            <Icon name="power" size={15} color={colors.primaryText} />
            <Text style={styles.text}> on</Text>
          </View>
        )}

        {action === "turn_off" && (
          <View style={styles.row}>
            <Icon name="power" size={15} color={colors.primaryText} />
            <Text style={styles.text}> off</Text>
          </View>
        )}

        {action === "set_brightness" && (
          <View style={styles.row}>
            <Icon name="sun" size={17} color={colors.primaryText} />
            <Text style={styles.text}> {data}</Text>
          </View>
        )}

        {action === "set_rgb" && (
          <View style={styles.row}>
            <Icon name="droplet" size={17} color={colors.primaryText} />
            <Text style={styles.text}> {data}</Text>
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
    justifyContent: "flex-end",
    gap: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
