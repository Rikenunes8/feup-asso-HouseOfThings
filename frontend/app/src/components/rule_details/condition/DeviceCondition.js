import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import colors from "../../../../configs/colors";

export default function DeviceCondition({ device, data }) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{device.name}</Text>

      <View style={styles.specs}>
        {data.map((condition, index) => {
          return (
            <View style={styles.row} key={index}>
              {condition.attribute === "power" && (
                <View style={styles.row}>
                  <Icon name="power" size={15} color={colors.primaryText} />
                  <Text style={styles.text}>
                    {" "}
                    {condition.state ? "on" : "off"}
                  </Text>
                </View>
              )}

              {condition.attribute === "brightness" && (
                <View style={styles.row}>
                  <Icon name="sun" size={17} color={colors.primaryText} />
                  <Text style={styles.text}>
                    {" "}
                    {condition.comparator} {condition.state}
                  </Text>
                </View>
              )}

              {condition.attribute === "temperature" && (
                <View style={styles.row}>
                  <Icon
                    name="thermometer"
                    size={15}
                    color={colors.primaryText}
                  />
                  <Text style={styles.text}>
                    {" "}
                    {condition.comparator} {condition.state}
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
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
    justifyContent: "flex-start",
    gap: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
