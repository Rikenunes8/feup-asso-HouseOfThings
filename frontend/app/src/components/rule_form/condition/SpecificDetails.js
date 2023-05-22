import React from "react";
import ScheduleForm from "../ScheduleForm";
import DeviceForm from "../DeviceForm";

export default function SpecificDetails(props) {
  switch (props.type) {
    case "device":
      return <DeviceForm index={props.index} category={props.category} capabilities={props.capabilities} isRuleCondition={true} condition={props.condition} ></DeviceForm>;
    case "schedule":
      return <ScheduleForm index={props.index} condition={props.condition}></ScheduleForm>;
    default:
      return null;
  }
}
