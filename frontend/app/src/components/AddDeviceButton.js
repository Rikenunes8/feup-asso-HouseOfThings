import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../../configs/colors";

export default function AddDeviceButton({ children, onPress }) {
  return (
    <View style={styles.buttonBackgroud}>
      <TouchableOpacity style={styles.buttonOppacity} onPress={onPress}>
        <View style={styles.button}>{children}</View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonBackgroud: {
    top: -40,
    width: 85,
    height: 85,
    borderRadius: 42.5,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonOppacity: {
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
