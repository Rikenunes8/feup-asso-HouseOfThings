import React from "react";
import { Text } from "react-native";
import LightSpecs from "./LightSpecs";

export default function DeviceForm(props) {
  switch (props.category) {
    case "light":
      return <LightSpecs index={props.index} isRuleCondition={props.isRuleCondition}></LightSpecs>;
    case "thermometer":
      return <Text>Thermometer</Text>;
    default:
      return null;
  }
}
