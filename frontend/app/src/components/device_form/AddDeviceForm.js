import React, { useState, useContext } from "react";
import { StyleSheet, View, ScrollView } from "react-native";

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

  return (
    <View style={styles.container}>
      {/* TODO(LAYOUT): try to find another solution to scroll dropdownpicker inside of scroll view */}
      <ScrollView style={styles.scrollContent}>
        <DynamicDropDown
          label={"UUID *"}
          items={uuidItems}
          setItems={setUUIDItems}
          value={deviceUUID}
          setValue={setDeviceUUID}
          listMode={"MODAL"}
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
          listMode={"MODAL"}
        />
      </ScrollView>
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
  scrollContent: {
    width: "100%",
  },
});
