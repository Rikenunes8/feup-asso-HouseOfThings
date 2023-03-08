import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  Modal,
  View,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import ChooseDeviceScrollView from "../components/ChooseDeviceScrollView";
import colors from "../../configs/colors";
import ChooseDeviceSideBar from "../components/ChooseDeviceSideBar";

export default function AddDeviceModal({ modalVisible, setModalVisible }) {
  const [categories, setCategories] = useState([
    "Light",
    "Sensor",
    "Security",
    "Socket",
    "Appliance",
    "Other",
  ]);
  const [deviceTypes, setDeviceTypes] = useState([
    "LightBulb 1",
    "LightBulb 2",
    "LightBulb 3",
    "LightBulb 4",
    "LightBulb 5",
    "LightBulb 6",
    "LightBulb 7",
    "LightBulb 8",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("Light");

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      {/* <SafeAreaView style={styles.container}> */}
      <View style={{ flex: 1, backgroundColor: colors.transparentGray }}>
        <View style={styles.modal}>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Icon
              name="close"
              size={30}
              color={colors.white}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Add Device</Text>
          <View style={styles.modalBody}>
            <ChooseDeviceSideBar
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <ChooseDeviceScrollView deviceTypes={deviceTypes} />
          </View>
        </View>
      </View>
      {/* </SafeAreaView> */}
    </Modal>
  );
}

const styles = StyleSheet.create({
  closeIcon: {
    marginLeft: 25,
    marginBottom: 15,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  modal: {
    backgroundColor: colors.primary,
    flex: 1,
    marginTop: Platform.OS === "android" ? "15%" : "30%",
    justifyContent: "flex-end",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: colors.gray,
  },
  modalBody: {
    backgroundColor: colors.white,
    flex: 0.97,
    flexDirection: "row",
    paddingVertical: 15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  modalTitle: {
    color: colors.white,
    fontSize: 27,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 15,
  },
});
