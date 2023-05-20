import React, { useEffect, useState } from "react";

import { StyleSheet } from "react-native";
import Row from "../grid/Row";
import Col from "../grid/Column";

import DynamicDropDown from "../form/DynamicDropDown";
import ConfigurationsForm from "./condition/ConfigurationsForm";

import colors from "../../../configs/colors";

export default function LightSpecs({ index, isRuleCondition, capabilities, condition, action }) {
  const capabilitiesMap = {
    power: {
      name: "Status",
      component: "switch",
    },
    brightness: {
      name: "Brightness",
      component: isRuleCondition ? "slider" : "dropdown",
    },
    temperature: {
      name: "Temperature",
      component: isRuleCondition ? "slider" : "dropdown",
    },
  };

  const capabilitiesActionsMap = {
    turn_on: "power",
    turn_off: "power",
    set_brightness: "brightness",
  };

  const [possibleConfigurations, setPossibleConfigurations] = useState(
    capabilities.map((capability) => {
      return {
        label: capabilitiesMap[capability].name,
        value: capabilitiesMap[capability].component,
      };
    })
  );

  const [currentConfiguration, setCurrentConfiguration] = useState(
    condition
      ? capabilitiesMap[condition.attribute].component
      : action
      ? capabilitiesMap[capabilitiesActionsMap[action.action]].component
      : possibleConfigurations[0].value
  );

  const modalProps = {
    transparent: true,
    presentationStyle: "overFullScreen",
  };

  return (
    <Row>
      <Col numRows={3}>
        <DynamicDropDown
          items={possibleConfigurations}
          setItems={setPossibleConfigurations}
          value={currentConfiguration}
          setValue={setCurrentConfiguration}
          listMode={"MODAL"}
          modalProps={modalProps}
          modalContentContainerStyle={styles.modalContent}
        ></DynamicDropDown>
      </Col>

      <Col numRows={1}>
        <ConfigurationsForm
          condition={condition}
          action={action}
          feat={currentConfiguration}
          index={index}
          isCondition={isRuleCondition}
        ></ConfigurationsForm>
      </Col>
    </Row>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: colors.white,
    marginHorizontal: 28,
    marginBottom: 25,
    marginTop: "92.5%",
  },
});
