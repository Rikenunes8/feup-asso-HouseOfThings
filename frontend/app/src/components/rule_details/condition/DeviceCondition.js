import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import colors from "../../../../configs/colors";

export default function DeviceCondition({ device, state }) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{device.name}</Text>

      <View style={styles.specs}>
        {state.status && (
          <View style={styles.row}>
            <Icon name="power" size={15} color={colors.primaryText} />
            <Text style={styles.text}>
              {" "}
              {state.status === "turn_on" ? "on" : "off"}
            </Text>
          </View>
        )}

        {state.brightness && (
          <View style={styles.row}>
            <Icon name="sun" size={17} color={colors.primaryText} />
            <Text style={styles.text}> {state.brightness}</Text>
          </View>
        )}

        {state.temperature && (
          <View style={styles.row}>
            <Icon name="thermometer" size={15} color={colors.primaryText} />
            <Text style={styles.text}> {state.temperature}</Text>
          </View>
        )}

        {state.rgb && (
          <View style={styles.row}>
            <Icon name="droplet" size={15} color={colors.primaryText} />
            <Text style={styles.text}> {state.rgb}</Text>
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
