import React, { useEffect, useState } from "react";

import Row from "../grid/Row";
import Col from "../grid/Column";

import DynamicDropDown from "../form/DynamicDropDown";
import ConfigurationsForm from "./condition/ConfigurationsForm";

export default function LightSpecs({ index, isRuleCondition }) {
  //TODO - Não fazer isto hardcoded
  const possibleConfigurations = [
    { label: "Status", value: "status" },
    { label: "Brightness", value: isRuleCondition ? "slider" : "dropdown" },
  ];

  const [currentConfiguration, setCurrentConfiguration] = useState(possibleConfigurations[0].value);

  return (
    <Row>
      <Col numRows={3}>
        <DynamicDropDown
          items={possibleConfigurations}
          value={currentConfiguration}
          setValue={setCurrentConfiguration}
        ></DynamicDropDown>
      </Col>

      <Col numRows={1}>
        <ConfigurationsForm
          feat={currentConfiguration}
          index={index}
          isCondition={isRuleCondition}
        ></ConfigurationsForm>
      </Col>
    </Row>
  );
}
