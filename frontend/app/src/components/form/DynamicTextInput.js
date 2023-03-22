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
  const [expanded, expandInput] = React.useState(false);

  function handleEndTyping() {
    if (name=="") expandInput(false);
    setInputOnFocus(false);
  }

  function handleTyping() {
    setInputOnFocus(true);
    expandInput(true);
  }

  return (
    <View style={expanded ? [styles.container, styles.container_expanded] : styles.container}>
      <Text style={styles.fieldName}>{label}</Text>
      <TextInput
        maxLength={40}
        onChangeText={(name) => setName(name)}
        onFocus={handleTyping}
        onEndEditing={handleEndTyping}
        value={name}
        style={expanded ? styles.inputExpanded : styles.input}
      > 
        
      </TextInput>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width:"90%",
    margin: 20,
    borderBottomWidth:1,
  },
  container_expanded: {
    borderBottomWidth:1,
    flexDirection: "column",
  },
  input: {
    position: "absolute",
    width:"100%",
    paddingBottom: 15,
  },
  inputExpanded: {
    paddingBottom: 15,
    paddingHorizontal: 8,
  },
  fieldName: {
    color: colors.primary,
    paddingBottom: 15,
  }
});
