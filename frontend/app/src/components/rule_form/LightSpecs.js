import React, { useEffect, useState } from "react";

import { StyleSheet } from "react-native";
import Row from "../grid/Row";
import Col from "../grid/Column";

import DynamicDropDown from "../form/DynamicDropDown";
import ConfigurationsForm from "./condition/ConfigurationsForm";

import colors from "../../../configs/colors";

export default function LightSpecs({ index, isRuleCondition }) {

  //TODO - Não fazer isto hardcoded
  const [possibleConfigurations, setPossibleConfigurations] = useState([
    { label: "Status", value: "status" },
    { label: "Brightness", value: isRuleCondition ? "slider" : "dropdown" },
  ]);

  const [currentConfiguration, setCurrentConfiguration] = useState(possibleConfigurations[0].value);

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
    marginHorizontal: 28,
    marginBottom: 25,
    marginTop: "92.5%",
  },
});