import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";

import DevicesContext from "../../../contexts/DevicesContext";
import CreateRuleContext from "../../../contexts/CreateRuleContext";

import utils from "../../../utils/utils";
import colors from "../../../../configs/colors";

import Row from "../../grid/Row";
import SpecificDetails from "./SpecificDetails";
import DynamicDropDown from "../../form/DynamicDropDown";

export default function NewConditionCard(props) {
  const [ type, setType ] = useState({});
  const { devices } = useContext(DevicesContext);
  const { addRuleCondition } = useContext(CreateRuleContext);

  const handleTypeChange = (item) => {
    setType(item);
    x = (item.parent == "device" ? {"kind" : item.parent, "device_id" : item.value}: {"kind" : item.parent})
    addRuleCondition(props.index, x)
  }

  const [items] = useState(() => {
    all_items = [{ label: "Time", value: "time", parent: "schedule" }];

    devices.map((item) => {
      all_items.push({
        label: utils.capitalize(item.name),
        value: item.uid,
        parent: "device",
        category: item.category,
      });
    });

    return all_items;
  });

  return (
    <View style={styles.container}>
      <Row>
        <DynamicDropDown
          items={items}
          value={type}
          setValue={setType}
          onChange={(e) => handleTypeChange(e)}
        ></DynamicDropDown>
      </Row>

      <SpecificDetails type={type.parent} index={props.index} category={type.category}></SpecificDetails>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    alignItems: "center",
    alignContent: "center",
    borderRadius: 5,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    padding: 15,
    marginVertical:10, 
    paddingHorizontal: 20,
    zIndex: 0
  },
});
