import React from "react";
import ScheduleForm from "../../form/ScheduleForm";
import DeviceDetailsForm from "./DeviceDetailsForm";

export default function SpecificDetails({ ruleCondition, setRuleCondition }) {
  switch (ruleCondition.kind) {
    case "device":
      return (
        <DeviceDetailsForm
          ruleCondition={ruleCondition}
          setRuleCondition={setRuleCondition}
        ></DeviceDetailsForm>
      );
    case "schedule":
      return (
        <ScheduleForm
          ruleCondition={ruleCondition}
          setRuleCondition={setRuleCondition}
        ></ScheduleForm>
      );
    default:
      return null;
  }
}
