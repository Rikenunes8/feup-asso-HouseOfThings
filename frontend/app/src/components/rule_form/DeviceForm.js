import React, { useEffect, useState } from "react";

import { StyleSheet, Text } from "react-native";
import Row from "../grid/Row";
import Col from "../grid/Column";

import DynamicDropDown from "../form/DynamicDropDown";
import ConfigurationsForm from "./condition/ConfigurationsForm";

import colors from "../../../configs/colors";

export default function DeviceForm(props) {

  const capabilitiesMap = {
    power: {
      name: "Status",
      component: "switch",
    },
    brightness: {
      name: "Brightness",
      component: props.isRuleCondition ? "slider" : "dropdown",
    },
    temperature: {
      name: "Temperature",
      component: props.isRuleCondition ? "slider" : "dropdown",
    },
    color: {
      name: "Color",
      component: "color-picker",
    },
  };

  const [possibleConfigurations, setPossibleConfigurations] = useState([{}]);

  const updateConfigurations = () => {
    setPossibleConfigurations(
      props.capabilities.map((capability) => {
        return {
          
          label: capabilitiesMap[capability].name,
          value: capabilitiesMap[capability].component,
        };
      })
    );
  };

  useEffect(() => {
    if(props.capabilities != undefined) updateConfigurations();
  }, [props.capabilities]);

  const [currentConfiguration, setCurrentConfiguration] = useState(
    possibleConfigurations[0].value
  );

  const modalProps = {
    transparent: true,
    presentationStyle: "overFullScreen",
  };

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
        ></DynamicDropDown>
      </Col> 
        <ConfigurationsForm
          feat={currentConfiguration}
          index={props.index}
          isCondition={props.isRuleCondition}
        ></ConfigurationsForm>
    
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


