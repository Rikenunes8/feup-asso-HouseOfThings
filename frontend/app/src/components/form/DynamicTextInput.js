import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

import colors from "../../../configs/colors";

export default function DynamicTextInput({label, name, setName}) {

  const [focus, onFocus] = React.useState(false);

  return (
    
      <View style= {focus ? [styles().form, styles().focused] : styles().form}>
        <Text style={styles().field}>{label}</Text>
        <TextInput
          maxLength={40}
          onChangeText={name => setName(name)}
          onFocus={() => onFocus(true)}
          onEndEditing={()=> {if (name=="") onFocus(false)}}
          value={name}
          style={styles().input}
        />
      </View>
  );
}

const styles = (on = false) =>
  StyleSheet.create({
    form: {
      flexDirection: "row",
      alignItems: "center",
      margin: 20,
      borderBottomWidth: 1,
      width: "90%",
      
    },
    focused: {
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

