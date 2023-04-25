import React from "react";
import ScheduleForm from "../../form/ScheduleForm";
import DeviceDetailsForm from "./DeviceDetailsForm";

export default function SpecificDetails(props) {
  switch (props.condition) {
    case "device":
      return (
        <DeviceDetailsForm
          index={props.index}
        ></DeviceDetailsForm>
      );
    case "schedule":
      return (
        <ScheduleForm
          index={props.index}
        ></ScheduleForm>
      );
    default:
      return null;
  }
}
