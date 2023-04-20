import React, { useState, useContext } from "react";
import { StyleSheet, SafeAreaView } from "react-native";

import DynamicDropDown from "../../form/DynamicDropDown";
import DevicesContext from "../../../contexts/DevicesContext";

import utils from "../../../utils/utils";
import colors from "../../../../configs/colors";

import Col from "../../grid/Column";
import Row from "../../grid/Row";
import SpecificDetails from "./SpecificDetails";

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

  const [items, setItems] = useState(() => {
    all_items = [
      { label: "Device", value: "device" },
      { label: "Schedule", value: "schedule" },
      { label: "Time", value: "time", parent: "schedule" },
    ];

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
            label={""}
            items={items}
            setItems={setItems}
            value={kindValue}
            setValue={setKindValue}
            isSearchable={false}
            dividedByCategories={true}
            margin={5}
            onSelectItem={(item) => updateKindValue(item)}
          />
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
