import React from 'react'
import {
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import colors from "../../configs/colors";

export default function AddDeviceScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>AddDeviceScreen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
  },
});