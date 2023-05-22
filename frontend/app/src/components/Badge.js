import React from "react";
import { StyleSheet, Text, View } from "react-native";

import colors from "../../configs/colors";

export default function Badge({ color, content }) {
  return (
    <View style={styles(color).badge}>
      <Text style={styles().text}>{content}</Text>
    </View>
  );
}

const styles = (backgroundColor = colors.cold) =>
  StyleSheet.create({
    badge: {
      backgroundColor: backgroundColor,
      borderRadius: 22,
      paddingVertical: 2,
      paddingHorizontal: 8,
      width: 45,
      height: 22,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: "white",
      fontSize: 12,
      textAlign: "center",
      textTransform: "capitalize",
      fontWeight: 500,
    },
  });
