import React from "react";
import {StyleSheet, View} from "react-native";

import DynamicTextInput from "../form/DynamicTextInput";
import DynamicDropDown from "../form/DynamicDropDown";

export default function AddDeviceForm({ name, value, setName, setValue, inputOnFocus, setInputOnFocus }) {
  const [items, setItems] = React.useState([
    { label: "Living Room", value: "living" },
    { label: "Kitchen", value: "kitchen" },
  ]);

  return (
    <View style={styles.container}>
      <DynamicTextInput
        label={"NAME*"}
        name={name}
        setName={setName}
        inputOnFocus={inputOnFocus}
        setInputOnFocus={setInputOnFocus}
      ></DynamicTextInput>
      <DynamicDropDown
        label={"DIVISION"}
        items={items}
        setItems={setItems}
        value={value}
        setValue={setValue}
      ></DynamicDropDown>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginVertical: 5,
  },
});
