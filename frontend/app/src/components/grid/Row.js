import React from "react";
import { StyleSheet, View } from "react-native";

export default function Row({ children, style }) {
  return <View style={[styles.row, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    marginBottom: 3,
    width: "100%",
  },
});
