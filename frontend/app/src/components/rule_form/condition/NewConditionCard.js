import React, { useState, useContext } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";

import DevicesContext from "../../../contexts/DevicesContext";

import utils from "../../../utils/utils";
import colors from "../../../../configs/colors";

import Col from "../../grid/Column";
import Row from "../../grid/Row";
import SpecificDetails from "./SpecificDetails";
import DynamicDropDown from "../../form/DynamicDropDown";

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

export default function NewConditionCard({ ruleCondition, setRuleCondition }) {
  const [kindValue, setKindValue] = useState({});

  const updateKindValue = (item) => {
    if (item.parent == "schedule")
      setRuleCondition((prevJson) => ({
        ...prevJson,
        kind: item.parent,
      }));
    else {
      setRuleCondition((prevJson) => ({
        ...prevJson,
        kind: item.parent,
        device_id: item.value,
      }));
    }
  };

  const { devices } = useContext(DevicesContext);

  const [items] = useState(() => {
    all_items = [{ label: "Time", value: "time", parent: "schedule" }];

    devices.map((item) => {
      all_items.push({
        label: utils.capitalize(item.name),
        value: item.uid,
        parent: "device",
      });
    });

    return all_items;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Row>
        <Col numRows={1}>
          <DynamicDropDown
            items={items}
            value={kindValue}
            setValue={setKindValue}
            onChange={(e) => updateKindValue(e)}
          ></DynamicDropDown>
        </Col>
      </Row>

      <SpecificDetails
        ruleCondition={ruleCondition}
        setRuleCondition={setRuleCondition}
      ></SpecificDetails>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    paddingHorizontal: 5,
    width: "90%",
    backgroundColor: colors.white,
    borderRadius: 5,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
