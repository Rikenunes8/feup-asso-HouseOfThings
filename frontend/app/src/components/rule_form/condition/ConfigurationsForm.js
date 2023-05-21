import React from "react";
import TemperatureCondition from "./capabilities/TemperatureCondition";
import BrightnessCondition from "./capabilities/BrightnessCondition";
import PowerCondition from "./capabilities/PowerCondition";
import PowerAction from "../action/capabilities/PowerAction";
import BrightnessAction from "../action/capabilities/BrightnessAction";
import ColorAction from "../action/capabilities/ColorAction";

export default function ConfigurationsForm(props) {
  if (props.isCondition) {
    switch (props.feat.label.toLowerCase()) {
      case "power":
        return (
          <PowerCondition
            index={props.index}
            status={props.condition && props.condition.state}
          />
        );
      case "brightness":
        return (
          <BrightnessCondition
            index={props.index}
            status={props.condition && props.condition.state}
          />
        );
      case "temperature":
        return (
          <TemperatureCondition
            index={props.index}
            status={props.condition && props.condition.state}
          />
        );
      default:
        return null;
    }
  } else {
    switch (props.feat.label.toLowerCase()) {
      case "power":
        return (
          <PowerAction
            index={props.index}
            action={props.action && props.action.action == "turn_on"}
          />
        );
      case "brightness":
        return (
          <BrightnessAction
            index={props.index}
            action={props.action ? props.action.data : null}
          />
        );
      case "color":
        return (
          <ColorAction
            index={props.index}
            action={props.action ? props.action.data : null}
          />
        );
      default:
        return null;
    }
  }
}
