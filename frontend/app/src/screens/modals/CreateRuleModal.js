import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import ModalsContext from "../../contexts/ModalsContext";
import TitleModal from "../../components/modal/TitleModal";
import CreateRuleForm from "../../components/rule_form/CreateRuleForm";
import ChooseDeviceScrollView from "../../components/choose_device/ChooseDeviceScrollView";
import ChooseDeviceSideBar from "../../components/choose_device/ChooseDeviceSideBar";
import CreateRuleContext from "../../contexts/CreateRuleContext";
import RulesContext from "../../contexts/RulesContext";

import utils from "../../utils/utils";
import api from "../../api/api";

export default function CreateRuleModal() {
  /*const {
    chooseDeviceModalVisible,
    setChooseDeviceModalVisible,
    isChooseDeviceModalLoading
  } = useContext(ModalsContext);*/
  const { addRule } = useContext(RulesContext);

  const {
    createRuleModalVisible,
    setCreateRuleModalVisible,
    isCreateRuleModalLoading,
    setIsCreateRuleModalLoading,
  } = useContext(ModalsContext);

  const { ruleName, setRuleName, resetCreateRuleContext } =
    useContext(CreateRuleContext);

  const connectCallback = () => {
    const rule = {
      id: 1,
      name: ruleName,
      operation: "and",
      when: [],
      then: [
        {
          device_id: 1,
          action: "turn_off",
        },
      ],
    };

    console.log(`Adding ${ruleName}...`);
    setIsCreateRuleModalLoading(true);

    api.addRule(rule).then((newRule) => {
      setIsCreateRuleModalLoading(false);
      if (newRule != null) {
        addRule(newRule);
        setCreateRuleModalVisible(false);
        resetCreateRuleContext();
      } else {
        utils.showErrorMessage("Failed to connect device");
      }
    });
  };

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
      leftIconCallback={() => {
        setCreateRuleModalVisible(false);
        resetCreateRuleContext();
        setInputOnFocus(false);
      }}
      rightIconCallback={() => {
        connectCallback();
      }}
      modalContent={
        <CreateRuleForm
          inputOnFocus={inputOnFocus}
          setInputOnFocus={setInputOnFocus}
        />
      }
      isLoading={isCreateRuleModalLoading}
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
