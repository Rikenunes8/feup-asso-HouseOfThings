import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";

import DynamicTextInput from "../form/DynamicTextInput";
import DynamicDropDown from "../form/DynamicDropDown";
import AddDeviceContext from "../../contexts/AddDeviceContext";
import DivisionsContext from "../../contexts/DivisionsContext";
import utils from "../../utils/utils";

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

  const { divisions } = useContext(DivisionsContext);

  const [items, setItems] = useState(
    divisions.map((item) => {
      return { label: utils.capitalize(item.name), value: item.name };
    })
  );

  const [uuidItems, setUUIDItems] = useState(
    availableDevices.map((item) => {
      return { label: item.uuid, value: JSON.stringify(item) };
    })
  );

  const [open, setOpen] = React.useState(false);

  return (
    <View style={styles.container}>
      <DynamicDropDown
        label={"UUID *"}
        items={uuidItems}
        value={deviceUUID}
        setValue={setDeviceUUID}
      ></DynamicDropDown>
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
        value={deviceDivision}
        setValue={setDeviceDivision}
      ></DynamicDropDown>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 5,
    paddingTop: 5,
  },
});
