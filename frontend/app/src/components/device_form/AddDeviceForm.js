import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";

import DynamicTextInput from "../form/DynamicTextInput";
import DynamicDropDown from "../form/DynamicDropDown";
import AddDeviceContext from "../../contexts/AddDeviceContext";

export default function AddDeviceForm() {
  const { deviceName, deviceDivision, setDeviceName, setDeviceDivision } =
    useContext(AddDeviceContext);

  const [items, setItems] = React.useState([
    { label: "Living Room", value: "living room" },
    { label: "Kitchen", value: "kitchen" },
  ]);

  return (
    <View style={styles.container}>
      <DynamicTextInput
        label={"NAME*"}
        name={deviceName}
        setName={setDeviceName}
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
