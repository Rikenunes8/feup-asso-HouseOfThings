import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../../configs/colors";

export default function Col({ flex, children }) {
  return <View style={styles(flex).container}>{children}</View>;
}

const styles = (flex = 0) =>
  StyleSheet.create({
    container: {
      flex: flex,
      alignItems: "center",
      justifyContent: "center",
      alignContent: "center",
    },
  });
