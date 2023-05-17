import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Logo from "../../../../assets/logo.svg";

import colors from "../../../configs/colors";

export default function Header() {
  return (
    <View style={styles.header}>
      <Logo width={80} height={80} />
      <Text style={styles.message}>House of Things</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flex: 0.15,
    backgroundColor: colors.primary,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  message: {
    color: colors.white,
    fontSize: 28,
    fontWeight: "bold",
  },
});
