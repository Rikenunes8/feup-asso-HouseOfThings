import React from "react";
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";

import colors from "../../../configs/colors";

export default function DynamicTextInput({label, name, setName, inputOnFocus, setInputOnFocus}) {

  const [expanded, expandInput] = React.useState(false);

  function handleEndTyping()
  {
    if (name=="") expandInput(false)
    setInputOnFocus(false)
  }

  function handleTyping()
  {
    setInputOnFocus(true)
    expandInput(true)
  }

  return (
    
      <View style= {expanded ? [styles().form, styles().expanded] : styles().form}>
        <Text style={styles().field}>{label}</Text>
        <TextInput
          maxLength={40}
          onChangeText={name => setName(name)}
          onFocus={handleTyping}
          onEndEditing={handleEndTyping}
          value={name}
          style={styles().input}
        />
      </View>
      
  );
}

const styles = (on = false) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    form: {
      flexDirection: "row",
      alignItems: "center",
      margin: 20,
      borderBottomWidth: 1,
      width: "90%",
      
    },
    expanded: {
      fontSize: 10,
      flexDirection: "column",
      alignItems: "flex-start"
    },
    field:{
      color: colors.primary,
    },
    input:{
        padding: 15, 
        paddingLeft: 10
    }

  });

