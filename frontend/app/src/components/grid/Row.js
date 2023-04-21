import React from "react";
import { StyleSheet, View } from "react-native";

export default function Row({ children }) {
  return <View style={[styles.row]}>{children}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 2,
    marginBottom: 3,
  },
});
