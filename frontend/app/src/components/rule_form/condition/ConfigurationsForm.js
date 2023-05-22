import React from "react";
import ComparatorDropdownCondition from "./capabilities/ComparatorDropdownCondition";
import SwitchCondition from "./capabilities/SwitchCondition";
import SwitchAction from "../action/capabilities/SwitchAction";
import DropdownAction from "../action/capabilities/DropdownAction";
import ColorAction from "../action/capabilities/ColorAction";

export default function ConfigurationsForm(props) {
  if (props.feat.value) {
    if (props.isCondition) {
      switch (props.feat.value.toLowerCase()) {
        case "switch":
          return (
            <SwitchCondition
              index={props.index}
              attribute={props.feat.attribute}
              status={props.condition && props.condition.state}
            />
          );
        case "comparator_dropdown":
          return (
            <ComparatorDropdownCondition
              index={props.index}
              attribute={props.feat.attribute}
              current_comparator={
                props.condition ? props.condition.comparator : null
              }
              current_state={props.condition ? props.condition.state : null}
            />
          );
        default:
          return null;
      }
    } else {
      switch (props.feat.value.toLowerCase()) {
        case "switch":
          return (
            <SwitchAction
              index={props.index}
              attribute={props.feat.attribute}
              action={props.action && props.action.action == "turn_on"}
            />
          );
        case "dropdown":
          return (
            <DropdownAction
              index={props.index}
              attribute={props.feat.attribute}
              action_name={`set_${props.feat.attribute}`}
              action={props.action ? props.action.data : null}
            />
          );
        case "color":
          return (
            <ColorAction
              index={props.index}
              attribute={props.feat.attribute}
              action_name={`set_${props.feat.attribute}`}
              action={props.action ? props.action.data : null}
            />
          );
        default:
          return null;
      }
    }
  }
}
