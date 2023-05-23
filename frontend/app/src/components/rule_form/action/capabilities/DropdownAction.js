import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import Col from "../../../grid/Column";
import DynamicDropDown from "../../../form/DynamicDropDown";
import CreateRuleContext from "../../../../contexts/CreateRuleContext";
import colors from "../../../../../configs/colors";

export default function DropdownAction({
  index,
  action,
  action_name,
  attribute,
}) {
  const { updateRuleAction } = useContext(CreateRuleContext);

  const [step, setStep] = useState(
    Array.from({ length: 21 }, (_, index) => ({
      label: `${index * 5}`,
      value: index * 5,
    }))
  );

  const [value, setValue] = useState(
    action && action[attribute] ? action[attribute] : step[0].value
  );

  const handleValueChange = (item) => {
    updateRuleAction(index, action_name, { [attribute]: item.value });
    setValue(item);
  };

  const modalProps = {
    transparent: true,
    presentationStyle: "overFullScreen",
  };

  useEffect(() => {
    updateRuleAction(index, action_name, { [attribute]: value });
  }, []);

  return (
    <Col flex={1.5}>
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
