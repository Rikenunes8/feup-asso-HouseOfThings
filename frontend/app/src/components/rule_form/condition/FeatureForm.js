import React, { useState, useContext } from "react";
import { Switch, StyleSheet, Text } from "react-native";
import RangeSlider from "../../form/RangeSlider";

import colors from "../../../../configs/colors";
import Col from "../../grid/Column";
import CreateRuleContext from "../../../contexts/CreateRuleContext";
import DynamicDropDown from "../../form/DynamicDropDown";

export default function FeatureForm(props) {
  const { addConditionState, updateAction} = useContext(CreateRuleContext);
  const [state, setState] = useState(false);
  const [operation, setOperation] = useState({label: "ADD", value: 0});
  const [value, setValue] = useState({label: "5", value: 5});

  const operations =
  [
    {label: "ADD", value: 0}, 
    {label: "SUB", value: 1},
    {label: "SET", value: 2},
  ];

  const step = Array.from({length: 4}, (_, index) => ({
    label: `${(index + 1) * 5}`,
    value: (index + 1) * 5
  }));

  const handleBrightnessChange = (item , field) => {
    x = {[field]: item}
    addConditionState(props.index, x);
  };

  const handleStatusChange = (item , field) => {
    setState(!state);

    y = (state ? "turnon" : "turnoff");

    x = {[field]: y}
    if(props.isCondition)
      addConditionState(props.index, x);
    else
    {
      updateAction(props.index, y);
    }
      
  };

  const setOpera = (item) => {

    val = item.label + value.label;
  
    if(! props.isCondition)
    {
      updateAction(props.index, val);
    }

    setOperation(item);
  }


  const handleAddSubChange = (item) => {
    val = operation.label + item.label;
  
    if(! props.isCondition)
    {
      updateAction(props.index, val);
    }
    setValue(item);
  };

  switch (props.feat) {
    case "status":
      return (
        <Switch
          trackColor={{ false: colors.desactive, true: colors.active }}
          thumbColor={colors.white}
          onValueChange={(e) => handleStatusChange(e, "status")}
          value={state}
          style={styles.switch}
        />
      );
    case "slider":
      return (
        <RangeSlider setValue={handleBrightnessChange} name={"brightness"}></RangeSlider>
      );
    case "add_sub":
      return (
        <>
        <Col numRows={1}>
        <DynamicDropDown
          items={operations}
          value={operation}
          setValue={setOperation}
          onChange={(item) =>
            setOpera(item)
          }
        ></DynamicDropDown>
        </Col>
        <Col numRows={1}>
        <DynamicDropDown
          items={step}
          value={value}
          setValue={setValue}
          onChange={(item) => handleAddSubChange(item)}
        ></DynamicDropDown>
       
       </Col>
       </>
      )
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  switch: { marginRight: 15 },
});
