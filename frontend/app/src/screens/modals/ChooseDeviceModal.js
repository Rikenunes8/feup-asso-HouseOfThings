import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import ModalsContext from "../../contexts/ModalsContext";
import TitleModal from "../../components/TitleModal";
import ChooseDeviceScrollView from "../../components/choose_device/ChooseDeviceScrollView";
import ChooseDeviceSideBar from "../../components/choose_device/ChooseDeviceSideBar";
import AvailableDevicesPopup from "../../components/AvailableDevicesPopup";

import api from "../../api/api";

export default function ChooseDeviceModal() {
  const {
    chooseDeviceModalVisible,
    setChooseDeviceModalVisible,
    availableDevicesMenuVisible,
  } = useContext(ModalsContext);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    return await api.getCategories();
  };

  useEffect(() => {
    fetchCategories().then((categories) => {
      setCategories(categories);
      setSelectedCategory(categories.length ? categories[0] : null);
    });
  }, []);

  return (
    <>
      {/* TODO: put this popup working */}
      <AvailableDevicesPopup isVisible={true} />
      <TitleModal
        visible={chooseDeviceModalVisible}
        title={"Add Device"}
        leftIcon={"close"}
        leftIconCallback={() => setChooseDeviceModalVisible(false)}
        modalContent={
          categories && selectedCategory ? (
            <View style={styles.modalContentView}>
              <ChooseDeviceSideBar
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
              <ChooseDeviceScrollView
                deviceTypes={selectedCategory.subcategories}
              />
            </View>
          ) : null
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  modalContentView: {
    height: "100%",
    flexDirection: "row",
    paddingVertical: 15,
  },
});
