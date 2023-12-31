import React, { useContext } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import ChooseDeviceModal from "../../screens/modals/ChooseDeviceModal";
import colors from "../../../configs/colors";
import AddDeviceModal from "../../screens/modals/AddDeviceModal";
import ModalsContext from "../../contexts/ModalsContext";

export default function AddDeviceButton({ children }) {
  const { chooseDeviceModalVisible, setChooseDeviceModalVisible } =
    useContext(ModalsContext);

  return (
    <View>
      <ChooseDeviceModal />
      <AddDeviceModal />

      <View style={styles.buttonBackgroud}>
        <TouchableOpacity
          style={styles.buttonOppacity}
          onPress={() => setChooseDeviceModalVisible(!chooseDeviceModalVisible)}
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
