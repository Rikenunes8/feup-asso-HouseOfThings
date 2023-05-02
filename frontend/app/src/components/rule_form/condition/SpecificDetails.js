import React from "react";
import ScheduleForm from "../ScheduleForm";
import DeviceForm from "../DeviceForm";

export default function SpecificDetails(props) {
  switch (props.type) {
    case "device":
      return <DeviceForm index={props.index} category={props.category} capabilities={props.capabilities} isRuleCondition={true} ></DeviceForm>;
    case "schedule":
      return <ScheduleForm index={props.index}></ScheduleForm>;
    default:
      return null;
  }
}
