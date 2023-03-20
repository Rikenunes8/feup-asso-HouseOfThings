import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

import colors from "../../../configs/colors";

export default function DynamicTextInput({ label, name, setName }) {
  const [focus, onFocus] = React.useState(false);

  return (
    <View style={[styles.form, styles.focused]}>
      <Text style={styles.field}>{label}</Text>
      <TextInput
        maxLength={40}
        onChangeText={(name) => setName(name)}
        onFocus={() => onFocus(true)}
        onEndEditing={() => {
          if (name == "") onFocus(false);
        }}
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
    width: "90%",
    padding: 12,
    borderBottomWidth: 1,
  },
});
