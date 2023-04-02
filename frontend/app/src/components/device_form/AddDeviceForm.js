import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";

import DynamicTextInput from "../form/DynamicTextInput";
import DynamicDropDown from "../form/DynamicDropDown";
import AddDeviceContext from "../../contexts/AddDeviceContext";

export default function AddDeviceForm({ inputOnFocus, setInputOnFocus }) {
  const {
    deviceUUID,
    deviceName,
    deviceDivision,
    setDeviceUUID,
    setDeviceName,
    setDeviceDivision,
    availableDevices,
  } = useContext(AddDeviceContext);

  // TODO: Get divisions dinamically
  const [items, setItems] = useState([
    { label: "Living Room", value: "living room" },
    { label: "Kitchen", value: "kitchen" },
  ]);

  const [uuidItems, setUUIDItems] = useState(
    availableDevices.map((item) => {
      return { label: item, value: item };
    })
  );

  return (
    <View style={styles.container}>
      <DynamicDropDown
        label={"UUID *"}
        items={uuidItems}
        setItems={setUUIDItems}
        value={deviceUUID}
        setValue={setDeviceUUID}
      />
      <DynamicTextInput
        label={"NAME *"}
        name={deviceName ?? ""}
        setName={setDeviceName}
        inputOnFocus={inputOnFocus}
        setInputOnFocus={setInputOnFocus}
      />
      <DynamicDropDown
        label={"DIVISION"}
        items={items}
        setItems={setItems}
        value={deviceDivision}
        setValue={setDeviceDivision}
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
