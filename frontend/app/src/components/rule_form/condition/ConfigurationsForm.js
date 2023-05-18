import React, { useState, useContext, useEffect } from "react";
import { Switch, StyleSheet, View, Text } from "react-native";
import RangeSlider from "../../form/RangeSlider";

import colors from "../../../../configs/colors";
import Col from "../../grid/Column";
import CreateRuleContext from "../../../contexts/CreateRuleContext";
import DynamicDropDown from "../../form/DynamicDropDown";
import ColorPicker from "../../form/ColorPicker";

export default function ConfigurationsForm(props) {
  const { addRuleConditionState, updateRuleAction } =
    useContext(CreateRuleContext);
  const [state, setState] = useState(false);
  const [operation, setOperation] = useState();
  const [value, setValue] = useState();
  const [selectedColor, setSelectedColor] = useState(colors.purple);

  useEffect(() => {
    console.log(operation);
  }, [operation]);

  const [possibleOperations, setPossibleOperations] = useState([
    { label: "ADD", value: "add_" },
    { label: "SUB", value: "sub_" },
    { label: "SET", value: "set_" },
  ]);

  const [step, setStep] = useState(
    Array.from({ length: 4 }, (_, index) => ({
      label: `${(index + 1) * 5}`,
      value: (index + 1) * 5,
    }))
  );

  const handleBrightnessChange = (item) => {
    addRuleConditionState(props.index, { ["brightness"]: item });
  };

  const handleStatusChange = (item) => {
    setState(!state);
    action = item ? "turn_on" : "turn_off";
    if (props.isCondition)
      addRuleConditionState(props.index, { ["power"]: item });
    else {
      updateRuleAction(props.index, action);
    }
  };

  const handleColorChange = (item) => {
    setSelectedColor(item);
    if (props.isCondition)
      addRuleConditionState(props.index, { ["color"]: item });
    else {
      updateRuleAction(props.index, item);
    }
  };

  const handleOperationChange = (item) => {
    val = item.label + value;

    if (!props.isCondition) {
      updateRuleAction(props.index, val);
    }

    setOperation(item);
  };

  const handleValueChange = (item) => {
    val = operation + item.label;

    if (!props.isCondition) {
      updateRuleAction(props.index, val);
    }
    setValue(item);
  };

  const modalProps = {
    transparent: true,
    presentationStyle: "overFullScreen",
  };

  switch (props.feat) {
    case "switch":
      return (
        <View style={styles.center}>
          <Switch
            trackColor={{ false: colors.desactive, true: colors.active }}
            thumbColor={colors.white}
            onValueChange={handleStatusChange}
            value={state}
            style={styles.switch}
          />
        </View>
      );
    case "slider":
      return (
        <View style={styles.center}>
          <RangeSlider
            setValue={handleBrightnessChange}
            name={"brightness"}
          ></RangeSlider>
        </View>
      );
    case "dropdown":
      return (
        <>
          <Col flex={1.2}>
            <DynamicDropDown
              items={possibleOperations}
              setItems={setPossibleOperations}
              value={operation}
              setValue={setOperation}
              listMode={"MODAL"}
              modalProps={modalProps}
              modalContentContainerStyle={styles.modalContent}
              onSelectItem={handleOperationChange}
            ></DynamicDropDown>
          </Col>
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
        </>
      );
    case "color-picker":
      return (
        <ColorPicker
          selectedColor={selectedColor}
          setSelectedColor={handleColorChange}
        ></ColorPicker>
      );
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  switch: { marginRight: 15 },
  modalContent: {
    backgroundColor: colors.white,
    marginHorizontal: 28,
    marginBottom: 25,
    marginTop: "92.5%",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
