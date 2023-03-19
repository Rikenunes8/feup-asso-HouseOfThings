import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import ChooseDeviceModal from "../screens/ChooseDeviceModal";
import colors from "../../configs/colors";
import AddDeviceModal from "../screens/AddDeviceModal";

export default function AddDeviceButton({ children }) {
  const [type, setType] = useState(null);
  const [isChooseModalVisible, setChooseModalVisible] = useState(false);
  const [isAddModalVisible, setAddModalVisible] = useState(false);

  return (
    <View>
      <ChooseDeviceModal
        setType={setType}
        modalVisible={isChooseModalVisible}
        setModalVisible={setChooseModalVisible}
        setAddModalVisible={setAddModalVisible}
      />

      <AddDeviceModal
        modalVisible={isAddModalVisible}
        setModalVisible={setAddModalVisible}
        type={type} //TODO
      />

      <View style={styles.buttonBackgroud}>
        <TouchableOpacity
          style={styles.buttonOppacity}
          onPress={() => setChooseModalVisible(!isChooseModalVisible)}
        >
          <View style={styles.button}>{children}</View>
        </TouchableOpacity>
      </View>
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
  buttonBackgroud: {
    top: -40,
    width: 85,
    height: 85,
    borderRadius: 42.5,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonOppacity: {
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
