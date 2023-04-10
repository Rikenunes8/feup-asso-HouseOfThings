import React from "react";
import { View, StyleSheet } from "react-native";

export default function Col({numRows, children}) {
  return <View style={styles[`${numRows}col`]}>{children}</View>;
}

const styles = StyleSheet.create({
  "1col": {
    flex: 1,
  },
  "2col": {
    flex: 2,
  },
  "3col": {
    flex: 3,
  },
  "4col": {
    flex: 4,
  },
});
