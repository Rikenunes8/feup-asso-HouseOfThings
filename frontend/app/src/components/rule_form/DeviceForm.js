import React from "react";
import { Text } from "react-native";
import LightSpecs from "./LightSpecs";

export default function DeviceForm(props) {
  switch (props.category) {
    case "light":
      return (
        <LightSpecs
          index={props.index}
          capabilities={props.capabilities}
          isRuleCondition={props.isRuleCondition}
        ></LightSpecs>
      );
    case "sensor":
      return <Text>Sensor</Text>;
    default:
      return null;
  }
}
