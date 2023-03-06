import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import colors from "../configs/colors";
import DeviceCard from "./components/DeviceCard";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeMessage}>Hello, Tiago!</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.sectionHeader}>Devices</Text>
        <DeviceCard
          name={"Philips Bulb"}
          division={"Family Room"}
          enabled={true}
        />
        <DeviceCard
          name={"Philips Bulb"}
          division={"Tiago Room"}
          enabled={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 0.85,
    alignItems: "center",
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
  },
  header: {
    width: "100%",
    flex: 0.15,
    backgroundColor: colors.primary,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    padding: 20,
  },
  sectionHeader: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.primary,
    alignSelf: "flex-start",
  },
  welcomeMessage: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "bold",
    marginStart: 15,
  },
});
