import React from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import colors from "../../../configs/colors";

export default function HoTTextInput({ label, value, onChangeText }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeText(text)}
        value={value}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  input: {
    width: "100%",
    height: 40,
    margin: 0,
    padding: 0,
    borderBottomWidth: 1,
    fontSize: 18,
  },
  text: {
    fontSize: 13,
    textTransform: "uppercase",
    textAlign: "left",
    color: colors.primary,
  },
});
