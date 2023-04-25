import React, { useState, useContext } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";

import Row from "../../grid/Row";
import Col from "../../grid/Column";

import FeatureForm from "../condition/FeatureForm";
import DynamicDropDown from "../../form/DynamicDropDown";

export default function LightSpecs(props) {
  //TODO - Não fazer isto hardcoded
  const [features] = useState(() => {
    all_items = [
      { label: "Status", value: "status" },
      { label: "Brightness", value: "add_sub" },
    ];

    return all_items;
  });

  const [value_a, setValue_a] = useState(null);
  const [featSelected, setFeatSelected] = useState(null);

  return (
    <Row>
      <Col numRows={2}>
        <DynamicDropDown
          items={features}
          value={value_a}
          setValue={setValue_a}
          onChange={(item) => setFeatSelected(item.value)}
        ></DynamicDropDown>
      </Col>

   
        <FeatureForm
          feat={featSelected} index={props.index} isCondition={false}
        ></FeatureForm>

    </Row>
  );
}

