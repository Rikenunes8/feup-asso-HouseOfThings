import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../../../configs/colors";
import Icon from "react-native-vector-icons/Feather";

export default function DeviceCondition({ device, state }) {
  state = {
    status: "turn_on",
    brightness: 100,
    rgb: "green",
    temperature: 27,
  };

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

        {state.rgb && (
          <View style={styles.row}>
            <Icon name="droplet" size={15} color={colors.primaryText} />
            <Text style={styles.text}> {state.rgb}</Text>
          </View>
        )}

        {state.temperature && (
          <View style={styles.row}>
            <Icon name="thermometer" size={15} color={colors.primaryText} />
            <Text style={styles.text}> {state.temperature}</Text>
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
