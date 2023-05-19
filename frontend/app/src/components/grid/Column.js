import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../../configs/colors";

export default function Col({ numRows, children }) {
  return (
    <View style={[styles[`${numRows}col`], { alignItems: "center", justifyContent: 'center'}]}>
      {children}
    </View>
  );
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