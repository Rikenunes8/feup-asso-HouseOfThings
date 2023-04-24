import React, { useState, useContext } from "react";
import { StyleSheet, View, Image } from "react-native";

import DynamicTextInput from "../form/DynamicTextInput";
import DynamicDropDown from "../form/DynamicDropDown";
import AddDivisionContext from "../../contexts/AddDivisionContext";
import DevicesDisplayInForm from "./DevicesDisplayInForm";

import colors from "../../../configs/colors";

export default function AddDivisionForm() {
  const { divisionName, divisionIcon, setDivisionName, setDivisionIcon } =
    useContext(AddDivisionContext);

  // TODO: List to be extended
  const [iconItems, setIconItems] = useState([
    {
      label: "Room Sofa",
      value: "room sofa",
      icon: () => <Image source={require("../../../../assets/sofa.png")} />,
    },
  ]);

  const [inputOnFocus, setInputOnFocus] = useState(false);

  const modalProps = {
    transparent: true,
    presentationStyle: "overFullScreen",
  };

  return (
    <>
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
      </View>
      <DevicesDisplayInForm />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    paddingHorizontal: 30,
  },
  modalContent: {
    backgroundColor: colors.white,
    marginHorizontal: 28,
    marginBottom: 25,
    marginTop: "92.5%",
  },
});
