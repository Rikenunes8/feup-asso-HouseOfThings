import React, { useState, useContext } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";

import Row from "../../grid/Row";
import Col from "../../grid/Column";

import colors from "../../../../configs/colors";
import FeatureForm from "./FeatureForm";
import DynamicDropDown from "../../form/DynamicDropDown";
import CreateRuleContext from "../../../contexts/CreateRuleContext";

export default function DeviceDetailsForm(props) {
  //TODO - Não fazer isto hardcoded
  const [features] = useState(() => {
    all_items = [
      { label: "Status", value: "status" },
      { label: "Brightness", value: "slider" },
    ];

    return all_items;
  });

  const [value_a, setValue_a] = useState(null);
  const [featSelected, setFeatSelected] = useState(null);

  return (
    <Row>
      <Col numRows={3}>
        <DynamicDropDown
          items={features}
          value={value_a}
          setValue={setValue_a}
          onChange={(item) => setFeatSelected(item.value)}
        ></DynamicDropDown>
      </Col>

      <Col numRows={1}>
        <FeatureForm
          feat={featSelected} index={props.index} isCondition={true}
        ></FeatureForm>
      </Col>
    </Row>
  );
}

