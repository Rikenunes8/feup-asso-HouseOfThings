import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import AddModal from "../components/AddModal";
import ChooseDeviceScrollView from "../components/choose_device/ChooseDeviceScrollView";
import ChooseDeviceSideBar from "../components/choose_device/ChooseDeviceSideBar";

import api from "../api/api";

export default function ChooseDeviceModal({
  setType,
  modalVisible,
  setModalVisible,
  setAddModalVisible,
}) {
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
    <AddModal
      title={"Add Device"}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      leftIcon={"close"}
      leftIconCallback={() => setModalVisible(false)}
      modalContent={
        categories && selectedCategory ? (
          <View style={styles.modalContentView}>
            <ChooseDeviceSideBar
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <ChooseDeviceScrollView
              setType={setType}
              deviceTypes={selectedCategory.subcategories}
              setChooseModalVisible={setModalVisible}
              setAddModalVisible={setAddModalVisible}
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
