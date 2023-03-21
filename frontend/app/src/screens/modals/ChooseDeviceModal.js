import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import ModalsContext from "../../contexts/ModalsContext";
import TitleModal from "../../components/TitleModal";
import ChooseDeviceScrollView from "../../components/choose_device/ChooseDeviceScrollView";
import ChooseDeviceSideBar from "../../components/choose_device/ChooseDeviceSideBar";


import api from "../../api/api";

export default function ChooseDeviceModal({ setAddModalVisible }) {
  const { chooseDeviceModalVisible, changeChooseDeviceModalVisible} = useContext(ModalsContext);
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
    <TitleModal
      visible={chooseDeviceModalVisible}
      title={"Add Device"}
      leftIcon={"close"}
      leftIconCallback={() => changeChooseDeviceModalVisible(false)}
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
              setChooseModalVisible={changeChooseDeviceModalVisible}
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
