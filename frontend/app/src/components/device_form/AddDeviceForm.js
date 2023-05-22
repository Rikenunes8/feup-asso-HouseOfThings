import React, { useState, useContext } from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";

import DynamicTextInput from "../form/DynamicTextInput";
import DynamicDropDown from "../form/DynamicDropDown";
import AddDeviceContext from "../../contexts/AddDeviceContext";
import DivisionsContext from "../../contexts/DivisionsContext";

import DivisionIcon from "../division_cards/DivisionIcon";
import colors from "../../../configs/colors";
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
      return {
        label: utils.capitalize(item.name),
        value: item.id,
        icon: () => {
          return (
            <DivisionIcon
              type="device"
              icon={item.icon}
              size={20}
              color={colors.black}
            />
          );
        },
      };
    })
  );

  const [uuidItems, setUUIDItems] = useState(
    availableDevices.map((item) => {
      return { label: item.uuid, value: JSON.stringify(item) };
    })
  );

  const modalProps = {
    transparent: true,
    presentationStyle: "overFullScreen",
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        <DynamicDropDown
          label={"UUID *"}
          items={uuidItems}
          setItems={setUUIDItems}
          value={deviceUUID}
          setValue={setDeviceUUID}
          listMode={"MODAL"}
          modalProps={modalProps}
          modalContentContainerStyle={styles.modalContent}
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
          modalProps={modalProps}
          modalContentContainerStyle={styles.modalContent}
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
  modalContent: {
    backgroundColor: colors.white,
    paddingHorizontal: 28,
    marginHorizontal: 0,
    paddingBottom: 25,
    marginTop:
      Dimensions.get("window").height *
      (Platform.OS === "android" ? 0.5 : 0.65),
    borderRadius: 30,
  },
});
