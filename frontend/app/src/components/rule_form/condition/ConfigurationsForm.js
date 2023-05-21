import React, { useState, useContext } from "react";
import { Switch, StyleSheet, View, Dimensions } from "react-native";
import RangeSlider from "../../form/RangeSlider";

import colors from "../../../../configs/colors";
import Col from "../../grid/Column";
import CreateRuleContext from "../../../contexts/CreateRuleContext";
import DynamicDropDown from "../../form/DynamicDropDown";

export default function ConfigurationsForm(props) {
  const { addRuleConditionState, updateRuleAction } =
    useContext(CreateRuleContext);
  const [state, setState] = useState(false);
  const [operation, setOperation] = useState({});
  const [value, setValue] = useState({});

  const [possibleOperations, setPossibleOperations] = useState([
    { label: "ADD", value: 0 },
    { label: "SUB", value: 1 },
    { label: "SET", value: 2 },
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
          <Col numRows={1}>
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
          <Col numRows={1}>
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
