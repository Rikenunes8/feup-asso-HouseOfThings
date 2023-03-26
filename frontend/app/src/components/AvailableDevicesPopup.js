import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ModalsContext from "../contexts/ModalsContext";
import AddDeviceContext from "../contexts/AddDeviceContext";

import colors from "../../configs/colors";

export default function AvailableDevicesPopup({ isVisible }) {
  const {
    setChooseDeviceModalVisible,
    setAddDeviceFormModalVisible,
    setAvailableDevicesMenuVisible,
  } = useContext(ModalsContext);
  const { availableDevices, setDeviceUUID } = useContext(AddDeviceContext);

  return (
    <View style={styles(isVisible).menu}>
      {availableDevices.map((id) => (
        <TouchableOpacity
          key={id}
          style={styles().menuOption}
          onPress={() => {
            setDeviceUUID(id);
            setAvailableDevicesMenuVisible(false);
            setChooseDeviceModalVisible(false);
            setAddDeviceFormModalVisible(true);
          }}
        >
          <Text style={styles(isVisible).menuOptionText}>{id}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = (isVisible = false) =>
  StyleSheet.create({
    menu: {
      display: isVisible ? "flex" : "none",
      position: "absolute",
      bottom: 500,
      borderRadius: 10,
      backgroundColor: colors.red,
    },
    menuOption: {
      flexDirection: "row",
      justifyContent: "flex-start",
      paddingVertical: 7,
      paddingHorizontal: 10,
    },
    menuOptionText: {
      fontSize: 17,
      color: false,
    },
  });
