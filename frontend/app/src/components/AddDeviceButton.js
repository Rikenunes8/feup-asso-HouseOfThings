import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import AddDeviceModal from "../screens/AddDeviceModal";
import colors from "../../configs/colors";

export default function AddDeviceButton({ children }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <AddDeviceModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <TouchableOpacity
        style={styles.buttonOppacity}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.button}>{children}</View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonOppacity: {
    top: -30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
