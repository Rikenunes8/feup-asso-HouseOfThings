import React, { useState } from "react";

import { StyleSheet, Dimensions } from "react-native";
import Row from "../grid/Row";
import Col from "../grid/Column";

import DynamicDropDown from "../form/DynamicDropDown";
import ConfigurationsForm from "./condition/ConfigurationsForm";

import colors from "../../../configs/colors";

export default function LightSpecs({ index, isRuleCondition, capabilities }) {
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

  const [possibleConfigurations, setPossibleConfigurations] = useState(
    capabilities.map((capability) => {
      const cap = capabilitiesMap[capability.toLowerCase()];

      return {
        label: cap.name,
        value: cap.component,
      };
    })
  );

  const [currentConfiguration, setCurrentConfiguration] = useState(
    possibleConfigurations[0].value
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
    paddingHorizontal: 28,
    marginHorizontal: 0,
    paddingBottom: 25,
    marginTop:
      67 +
      Dimensions.get("window").height *
        (Platform.OS === "android" ? 0.15 : 0.3),
    borderRadius: 30,
  },
});
