import React, { useEffect, useState } from "react";

import { StyleSheet, Text } from "react-native";
import Row from "../grid/Row";
import Col from "../grid/Column";

import DynamicDropDown from "../form/DynamicDropDown";
import ConfigurationsForm from "./condition/ConfigurationsForm";

import colors from "../../../configs/colors";

export default function DeviceForm(props) {
  const [possibleConfigurations, setPossibleConfigurations] = useState([{}]);

  const capabilitiesMap = {
    power: {
      label: "Power",
      value: "switch",
    },
    brightness: {
      label: "Brightness",
      value: props.isRuleCondition ? "slider" : "dropdown",
    },
    temperature: {
      label: "Temperature",
      value: props.isRuleCondition ? "slider" : "dropdown",
    },
    color: {
      label: "Color",
      value: "color",
    },
  };

  const capabilitiesActionsMap = {
    turn_on: "power",
    turn_off: "power",
    set_brightness: "brightness",
    set_color: "color",
  };

  const [feat, setFeat] = useState(
    props.capabilities ? capabilitiesMap[props.capabilities[0]] : []
  );

  const [currentConfiguration, setCurrentConfiguration] = useState(
    capabilitiesMap[props.capabilities[0]].value
  );

  const updateConfigurations = () => {
    setPossibleConfigurations(
      props.capabilities.map((capability) => {
        return capabilitiesMap[capability];
      })
    );
    setFeat(capabilitiesMap[props.capabilities[0]]);
    //setCurrentConfiguration(capabilitiesMap[props.capabilities[0]].value);
    setCurrentConfiguration(
      props.condition
        ? capabilitiesMap[props.condition.attribute].component
        : props.action
        ? capabilitiesMap[capabilitiesActionsMap[props.action.action]].component
        : capabilitiesMap[props.capabilities[0]].value
    );
  };

  const modalProps = {
    transparent: true,
    presentationStyle: "overFullScreen",
  };

  const handleConfigurationChange = (item) => {
    setFeat(item);
    setCurrentConfiguration(item.value);
  };

  useEffect(() => {
    if (props.capabilities != undefined) {
      updateConfigurations();
    }
  }, [props.capabilities]);

  return (
    <Row>
      <Col flex={2}>
        <DynamicDropDown
          items={possibleConfigurations}
          setItems={setPossibleConfigurations}
          value={currentConfiguration}
          setValue={setCurrentConfiguration}
          listMode={"MODAL"}
          modalProps={modalProps}
          modalContentContainerStyle={styles.modalContent}
          onSelectItem={(item) => handleConfigurationChange(item)}
        ></DynamicDropDown>
      </Col>
      {currentConfiguration != undefined ? (
        <ConfigurationsForm
          feat={feat}
          index={props.index}
          isCondition={props.isRuleCondition}
        ></ConfigurationsForm>
      ) : null}
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
