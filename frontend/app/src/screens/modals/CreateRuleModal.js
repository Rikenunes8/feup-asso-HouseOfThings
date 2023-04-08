import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import ModalsContext from "../../contexts/ModalsContext";
import TitleModal from "../../components/modal/TitleModal";
import CreateRuleForm from "../../components/rule_form/CreateRuleForm";
import ChooseDeviceScrollView from "../../components/choose_device/ChooseDeviceScrollView";
import ChooseDeviceSideBar from "../../components/choose_device/ChooseDeviceSideBar";
import { CreateRuleProvider } from "../../contexts/CreateRuleContext";

import api from "../../api/api";

export default function CreateRuleModal() {
  /*const {
    chooseDeviceModalVisible,
    setChooseDeviceModalVisible,
    isChooseDeviceModalLoading
  } = useContext(ModalsContext);*/

  const {
    createRuleModalVisible,
    setCreateRuleModalVisible

  } = useContext(ModalsContext);

  /*const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    return await api.getCategories();
  };

  useEffect(() => {
    fetchCategories().then((categories) => {
      setCategories(categories);
      setSelectedCategory(categories.length ? categories[0] : null);
    });
  }, []);*/

  const [inputOnFocus, setInputOnFocus] = React.useState(false);

  return (
    
    <TitleModal
      visible={createRuleModalVisible}
      title={"Create Rule"}
      leftIcon={"close"}
      rightIcon={"check"}
      leftIconCallback={() => setCreateRuleModalVisible(false)}
      modalContent={
  
        <CreateRuleForm
          inputOnFocus={inputOnFocus}
          setInputOnFocus={setInputOnFocus}
        />
   
      }
      //isLoading={isChooseDeviceModalLoading}
      /*<ChooseDeviceSideBar
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <ChooseDeviceScrollView
              subcategories={selectedCategory.subcategories}
            />*/
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
