import React, { useEffect, useState } from "react";

import { StyleSheet, Text } from "react-native";
import Row from "../grid/Row";
import Col from "../grid/Column";

import DynamicDropDown from "../form/DynamicDropDown";
import ConfigurationsForm from "./condition/ConfigurationsForm";

import colors from "../../../configs/colors";

export default function DeviceForm(props) {
<<<<<<< HEAD
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

  const updateConfigurations = () => {
    setPossibleConfigurations(
      props.capabilities.map((capability) => {
        return capabilitiesMap[capability];
      })
    );
    setFeat(capabilitiesMap[props.capabilities[0]]);
    setCurrentConfiguration(capabilitiesMap[props.capabilities[0]].value);
  };
 
  const [currentConfiguration, setCurrentConfiguration] = useState(
    capabilitiesMap[props.capabilities[0].value]
  );
  const [feat, setFeat] = useState(capabilitiesMap[props.capabilities[0]])

  const modalProps = {
    transparent: true,
    presentationStyle: "overFullScreen",
  };

  const handleConfigurationChange = (item) => {
    setFeat(item);
    setCurrentConfiguration(item.value);
  };

  useEffect(() => {
    if (props.capabilities != undefined) 
    {
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
          onSelectItem={(item ) => handleConfigurationChange(item)}
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
=======
  switch (props.category) {
    case "light":
      return (
        <LightSpecs
          index={props.index}
          capabilities={props.capabilities}
          isRuleCondition={props.isRuleCondition}
        ></LightSpecs>
      );
    case "sensor":
      return <Text>Sensor</Text>;
    default:
      return null;
  }
>>>>>>> develop
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: colors.white,
    marginHorizontal: 28,
    marginBottom: 25,
    marginTop: "92.5%",
  },
});
