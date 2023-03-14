import React from "react";
import { StyleSheet, View } from "react-native";

import DynamicTextInput from "../form/DynamicTextInput";
import DynamicDropDown from "../form/DynamicDropDown";

export default function AddDeviceForm({ on, handler }) {

  const [name, setName] = React.useState('');
  const [value, setValue] = React.useState(null);

  const [items, setItems] = React.useState([
    {label: 'Living Room', value: 'living'},
    {label: 'Kitchen', value: 'kitchen'}
  ]);

  return (
    <View style={styles().container}>
      <DynamicTextInput label={"NAME*"} name={name} setName={setName} ></DynamicTextInput>
      <DynamicDropDown label={"DIVISION"} items={items} setItems={setItems} value={value} setValue={setValue} ></DynamicDropDown>
    </View>
  );
}

const styles = (on = false) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "flex-start",
      marginVertical: 5,
    },
  });

