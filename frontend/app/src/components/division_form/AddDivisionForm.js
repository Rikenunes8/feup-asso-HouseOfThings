import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";

import DynamicTextInput from "../form/DynamicTextInput";
import DynamicDropDown from "../form/DynamicDropDown";
import AddDivisionContext from "../../contexts/AddDivisionContext";

export default function AddDivisionForm({ inputOnFocus, setInputOnFocus }) {
  const {
    divisionName,
    divisionIcon,
    setDivisionName,
    setDivisionIcon,
  } = useContext(AddDivisionContext);

  // TODO: Get icons dinamically
  const [iconItems, setIconItems] = useState([
    { label: "Living Room", value: "living room" },
    { label: "Kitchen", value: "kitchen" },
  ]);

  return (
    <View style={styles.container}>
      <DynamicTextInput
        label={"NAME *"}
        name={divisionName ?? ""}
        setName={setDivisionName}
        inputOnFocus={inputOnFocus}
        setInputOnFocus={setInputOnFocus}
      />
      <DynamicDropDown
        label={"ICON"}
        items={iconItems}
        setItems={setIconItems}
        value={divisionIcon}
        setValue={setDivisionIcon}
      />
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
