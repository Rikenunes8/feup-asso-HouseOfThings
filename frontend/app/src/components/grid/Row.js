import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../../../configs/colors";

export default function Row({ children}) {
  return <View style={[styles.row]}>{children}</View>;
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
