import React, { useState, useContext, useEffect } from "react";
import { Switch, StyleSheet, View, Dimensions } from "react-native";
import RangeSlider from "../../form/RangeSlider";

import colors from "../../../../configs/colors";
import Col from "../../grid/Column";
import CreateRuleContext from "../../../contexts/CreateRuleContext";
import DynamicDropDown from "../../form/DynamicDropDown";
import ColorPicker from "../../form/ColorPicker";

export default function ConfigurationsForm(props) {
  const label = props.feat.label.toLowerCase();
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

  const { addRuleConditionState, updateRuleAction } =
    useContext(CreateRuleContext);
  const [state, setState] = useState(false);
  const [operation, setOperation] = useState(possibleOperations[0].value);
  const [value, setValue] = useState(step[0].value);
  const [selectedColor, setSelectedColor] = useState(colors.purple);
  const [valueOnRange, setValuesOnRange] = useState([50, 80]);

  const handleSliderChange = (newValues) => {
    setValuesOnRange(newValues);
    addRuleConditionState(props.index, { [label]: newValues });
  };

  const handleStatusChange = (item) => {
    setState(!state);
    action = item ? "turn_on" : "turn_off";
    if (props.isCondition)
      addRuleConditionState(props.index, { [label]: item });
    else {
      updateRuleAction(props.index, action);
    }
  };

  const handleColorChange = (item) => {
    setSelectedColor(item);
    if (props.isCondition)
      addRuleConditionState(props.index, { [label]: item });
    else {
      updateRuleAction(props.index, item);
    }
  };

  const handleOperationChange = (item) => {
    val = item.value + value;

    if (!props.isCondition) {
      updateRuleAction(props.index, val);
    }

    setOperation(item);
  };

  const handleValueChange = (item) => {
    val = operation + item.value;

    if (!props.isCondition) {
      updateRuleAction(props.index, val);
    }
    setValue(item);
  };

  const modalProps = {
    transparent: true,
    presentationStyle: "overFullScreen",
  };

  function getDefaultConditionValue(val) {
    switch (val) {
      case "slider":
        return valueOnRange;
      case "dropdown":
        return operation + value; // Default numeric value for condition2
      case "color":
        return selectedColor; // Default boolean value for condition3
      case "switch":
        return props.isCondition ? state : state ? "turn_on" : "turn_off";
      default:
        return null; // Default value for other conditions
    }
  }

  useEffect(() => {
    const defaultValue = getDefaultConditionValue(props.feat.value);

    if (props.isCondition)
      addRuleConditionState(props.index, { [label]: defaultValue });
    else {
      updateRuleAction(props.index, defaultValue);
    }
  }, [props.feat]);

  switch (props.feat.value) {
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
            values={valueOnRange}
            setValue={handleSliderChange}
            name={props.feat.label}
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
    case "color":
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
    paddingHorizontal: 28,
    marginHorizontal: 0,
    paddingBottom: 25,
    marginTop:
      67 +
      Dimensions.get("window").height *
        (Platform.OS === "android" ? 0.15 : 0.3),
    borderRadius: 30,
  },
  center: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
