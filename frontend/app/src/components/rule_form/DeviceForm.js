import React, { useEffect, useState } from "react";

import { StyleSheet } from "react-native";
import Row from "../grid/Row";
import Col from "../grid/Column";

import DynamicDropDown from "../form/DynamicDropDown";
import ConfigurationsForm from "./condition/ConfigurationsForm";

import colors from "../../../configs/colors";

export default function DeviceForm(props) {
  const [possibleConfigurations, setPossibleConfigurations] = useState([]);
  const [feat, setFeat] = useState({});
  const capabilitiesMap = {
    power: {
      label: "Power",
      attribute: "power",
      value: "switch",
    },
    brightness: {
      label: "Brightness",
      attribute: "brightness",
      value: props.isRuleCondition ? "comparator_dropdown" : "dropdown",
      start: 0,
      stop: 100,
    },
    temperature: {
      label: "Temperature",
      attribute: "temperature",
      value: props.isRuleCondition ? "comparator_dropdown" : "dropdown",
      start: -20,
      stop: 50,
    },
    color: {
      label: "Color",
      attribute: "color",
      value: "color",
    },
  };

  const capabilitiesActionsMap = {
    turn_on: "power",
    turn_off: "power",
    set_brightness: "brightness",
    set_color: "color",
  };

  const [currentConfiguration, setCurrentConfiguration] = useState(
    capabilitiesMap[props.capabilities[0]].value
  );

  const updateConfigurations = () => {
    setPossibleConfigurations(
      props.capabilities.map((capability, index) => {
        return {
          ...capabilitiesMap[capability],
          key: index,
        };
      })
    );

    let config = null;
    if (
      props.isRuleCondition &&
      props.condition != null &&
      props.capabilities.includes(props.condition.attribute)
    ) {
      config = capabilitiesMap[props.condition.attribute];
    } else if (
      !props.isRuleCondition &&
      props.action != null &&
      props.capabilities.includes(capabilitiesActionsMap[props.action.action])
    ) {
      config = capabilitiesMap[capabilitiesActionsMap[props.action.action]];
    } else {
      config = capabilitiesMap[props.capabilities[0]];
    }

    setFeat(config);
    setCurrentConfiguration(config.value);
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
    <Row style={styles.container}>
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
          condition={props.condition ? props.condition : null}
          action={props.action ? props.action : null}
        ></ConfigurationsForm>
      ) : null}
    </Row>
  );
}

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
  },
  modalContent: {
    backgroundColor: colors.white,
    marginHorizontal: 28,
    marginBottom: 25,
    marginTop: "92.5%",
  },
});
