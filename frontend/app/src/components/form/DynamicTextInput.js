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
  //const [expanded, expandInput] = React.useState(false);

  function handleEndTyping() {
    //if (name=="") expandInput(false);
    setInputOnFocus(false);
  }

  function handleTyping() {
    setInputOnFocus(true);
    //expandInput(true);
  }

  return (
    <View style={[styles.form, styles.focused]}>
      <Text style={styles.field}>{label}</Text>
      <TextInput
        maxLength={40}
        onChangeText={(name) => setName(name)}
        onFocus={handleTyping}
        onEndEditing={handleEndTyping}
        value={name}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
    width: "100%",
  },
  focused: {
    fontSize: 10,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  field: {
    color: colors.primary,
  },
  input: {
    width: "89%",
    padding: 10,
    borderBottomWidth: 1.0,
  },
});
