import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

import colors from "../../../configs/colors";
export default function DynamicTextInput({
  label,
  name,
  setName,
  inputOnFocus,
  setInputOnFocus,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.field}>{label}</Text>
      <TextInput
        maxLength={40}
        onChangeText={(name) => setName(name)}
        onFocus={() => setInputOnFocus(true)}
        onEndEditing={() => setInputOnFocus(false)}
        value={name}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    borderBottomWidth: 1,
  },
  field: {
    color: colors.primary,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});
