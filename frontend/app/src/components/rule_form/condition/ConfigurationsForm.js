import React, { useState, useContext } from "react";
import { Switch, StyleSheet, Text } from "react-native";
import RangeSlider from "../../form/RangeSlider";

import colors from "../../../../configs/colors";
import Col from "../../grid/Column";
import CreateRuleContext from "../../../contexts/CreateRuleContext";
import DynamicDropDown from "../../form/DynamicDropDown";

export default function ConfigurationsForm(props) {
  const { addRuleConditionState, updateRuleAction } = useContext(CreateRuleContext);
  const [state, setState] = useState(false);
  const [operation, setOperation] = useState({});
  const [value, setValue] = useState({});

  const possibleOperations = [
    { label: "ADD", value: 0 },
    { label: "SUB", value: 1 },
    { label: "SET", value: 2 },
  ];

  const step = Array.from({ length: 4 }, (_, index) => ({
    label: `${(index + 1) * 5}`,
    value: (index + 1) * 5,
  }));

  const handleBrightnessChange = (item) => {
    addRuleConditionState(props.index, { ["brightness"]: item });
  };

  const handleStatusChange = (item) => {
    setState(!state);
    action = item ? "turnon" : "turnoff";
    if (props.isCondition)
      addRuleConditionState(props.index, { ["status"]: action });
    else {
      updateRuleAction(props.index, action);
    }
  };

  const handleOperationChange = (item) => {
    val = item.label + value.label;

    if (!props.isCondition) {
      updateRuleAction(props.index, val);
    }

    setOperation(item);
  };

  const handleValueChange = (item) => {
    val = operation.label + item.label;

    if (!props.isCondition) {
      updateRuleAction(props.index, val);
    }
    setValue(item);
  };

  switch (props.feat) {
    case "status":
      return (
        <Switch
          trackColor={{ false: colors.desactive, true: colors.active }}
          thumbColor={colors.white}
          onValueChange={handleStatusChange}
          value={state}
          style={styles.switch}
        />
      );
    case "slider":
      return (
        <RangeSlider
          setValue={handleBrightnessChange}
          name={"brightness"}
        ></RangeSlider>
      );
    case "dropdown":
      return (
        <>
          <Col numRows={1}>
            <DynamicDropDown
              items={possibleOperations}
              value={operation}
              setValue={setOperation}
              onChange={handleOperationChange}
            ></DynamicDropDown>
          </Col>
          <Col numRows={1}>
            <DynamicDropDown
              items={step}
              value={value}
              setValue={setValue}
              onChange={handleValueChange}
            ></DynamicDropDown>
          </Col>
        </>
      );
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  switch: { marginRight: 15 },
});
