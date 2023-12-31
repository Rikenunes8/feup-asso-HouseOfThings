import React, { useState, useContext } from "react";
import { StyleSheet, View, Platform, Dimensions } from "react-native";

import DynamicTextInput from "../form/DynamicTextInput";
import DynamicDropDown from "../form/DynamicDropDown";
import AddDivisionContext from "../../contexts/AddDivisionContext";
import DevicesDisplayInForm from "./DevicesDisplayInForm";

import colors from "../../../configs/colors";
import utils from "../../utils/utils";
import DivisionIcon, { icons } from "../division_cards/DivisionIcon";

export default function AddDivisionForm() {
  const { divisionName, divisionIcon, setDivisionName, setDivisionIcon } =
    useContext(AddDivisionContext);

  const [iconItems, setIconItems] = useState(
    Object.keys(icons).map((icon) => {
      return {
        label: utils.capitalize(icon.replace("-icon", "")),
        value: icon,
        icon: () => <DivisionIcon icon={icon} size={20} color={colors.black} />,
      };
    })
  );

  const [inputOnFocus, setInputOnFocus] = useState(false);

  const modalProps = {
    transparent: true,
    presentationStyle: "overFullScreen",
  };

  return (
    <View style={styles.container}>
      <DynamicTextInput
        label={"NAME *"}
        name={divisionName ?? ""}
        setName={setDivisionName}
        inputOnFocus={inputOnFocus}
        setInputOnFocus={setInputOnFocus}
      />
      <DynamicDropDown
        label={"ICON *"}
        items={iconItems}
        setItems={setIconItems}
        value={divisionIcon}
        setValue={setDivisionIcon}
        listMode={"MODAL"}
        modalProps={modalProps}
        modalContentContainerStyle={styles.modalContent}
      />
      <DevicesDisplayInForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    paddingHorizontal: 30,
  },
  modalContent: {
    backgroundColor: colors.white,
    paddingHorizontal: 28,
    marginHorizontal: 0,
    paddingBottom: 25,
    marginTop:
      67 +
      Dimensions.get("window").height *
        (Platform.OS === "android" ? 0.15 : 0.3),
    borderRadius: 30,
  },
});
