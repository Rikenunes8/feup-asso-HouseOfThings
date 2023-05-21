import React, { useState, useContext } from "react";
import { StyleSheet } from "react-native";
import Col from "../../../grid/Column";
import DynamicDropDown from "../../../form/DynamicDropDown";
import CreateRuleContext from "../../../../contexts/CreateRuleContext";
import colors from "../../../../../configs/colors";

export default function BrightnessAction({ index, action }) {
  const { updateRuleAction } = useContext(CreateRuleContext);

  const [step, setStep] = useState(
    Array.from({ length: 21 }, (_, index) => ({
      label: `${index * 5}`,
      value: index * 5,
    }))
  );

  const [value, setValue] = useState(
    action && action.brightness ? action.brightness : step[0].value
  );

  const handleValueChange = (item) => {
    updateRuleAction(index, "set_brightness", { brightness: item.value });
    setValue(item);
  };

  const modalProps = {
    transparent: true,
    presentationStyle: "overFullScreen",
  };

  return (
    <Col flex={0.9}>
      <DynamicDropDown
        items={step}
        setItems={setStep}
        value={value}
        setValue={setValue}
        listMode={"MODAL"}
        modalProps={modalProps}
        modalContentContainerStyle={styles.modalContent}
        onSelectItem={handleValueChange}
      ></DynamicDropDown>
    </Col>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: colors.white,
    marginHorizontal: 28,
    marginBottom: 25,
    marginTop: "92.5%",
  },
});
