import React from "react";
import { Text } from "react-native";
import LightSpecs from "./LightSpecs";

export default function DeviceForm(props) {
  switch (props.category) {
    case "light":
      return (
        <LightSpecs
          condition={props.condition}
          action={props.action}
          index={props.index}
          capabilities={props.capabilities}
          isRuleCondition={props.isRuleCondition}
        ></LightSpecs>
      );
    case "thermometer":
      return <Text>Thermometer</Text>;
    default:
      return null;
  }
}
