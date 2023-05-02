import React from "react";
import { StyleSheet, Text, View } from "react-native";

import colors from "../../../configs/colors";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.message}>Hello!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flex: 0.15,
    backgroundColor: colors.primary,
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  icon: {
    padding: 12,
    borderRadius: 24,
    alignSelf: "flex-end",
    backgroundColor: colors.white,
  },
  message: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "bold",
    marginStart: 15,
  },
});
