import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import HoTModal from "../components/HoTModal";
import ChooseDeviceScrollView from "../components/choose_device/ChooseDeviceScrollView";
import ChooseDeviceSideBar from "../components/choose_device/ChooseDeviceSideBar";

export default function AddDeviceModal({ modalVisible, setModalVisible }) {
  const [categories, setCategories] = useState({
    Light: ["Light Bulb"],
    Sensor: ["Motion Sensor", "Temperature Sensor", "Humidity Sensor"],
    Security: ["Camera", "Door Lock"],
    Socket: ["Extension Socket", "Power Socket"],
    Appliance: ["Fan", "TV", "AC", "Heater", "Oven", "Washer", "Dryer"],
    Other: ["Door Bell", "TV"],
  }); // TODO: get categories from backend (get icon from backend too ??)

  const [selectedCategory, setSelectedCategory] = useState(
    "Light" // TODO: only for vertical prototype, change after
    // Object.keys(categories).length ? Object.keys(categories)[0] : null
  );

  return (
    <HoTModal
      title={"Add Device"}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      leftIcon={"close"}
      leftIconCallback={() => setModalVisible(false)}
      modalContent={
        categories && selectedCategory ? (
          <View style={styles.modalContentView}>
            <ChooseDeviceSideBar
              categories={Object.keys(categories)}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <ChooseDeviceScrollView
              deviceTypes={categories[selectedCategory]}
            />
          </View>
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  modalContentView: {
    height: "100%",
    flexDirection: "row",
    paddingVertical: 15,
  },
});
