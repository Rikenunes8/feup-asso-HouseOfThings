import React, { useState, useContext } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";

import DevicesContext from "../../../contexts/DevicesContext";
import CreateRuleContext from "../../../contexts/CreateRuleContext";

import utils from "../../../utils/utils";
import colors from "../../../../configs/colors";

import Col from "../../grid/Column";
import Row from "../../grid/Row";
import SpecificDetails from "./SpecificDetails";
import DynamicDropDown from "../../form/DynamicDropDown";

export default function NewConditionCard(props) {
  const [ kindValue, setKindValue ] = useState({});
  const [ condition, setCondition ] = useState("");
  const { devices } = useContext(DevicesContext);
  const { addCondition } = useContext(CreateRuleContext);

  const updateKindValue = (item) => {
    setCondition(item.parent);
    x = (item.parent == "device" ? {"kind" : item.parent, "device_id" : item.value}: {"kind" : item.parent})
    addCondition(props.index, x)
      
  }

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
    <View style={styles.container}>
      <Row>
        <DynamicDropDown
          items={items}
          value={kindValue}
          setValue={setKindValue}
          onChange={(e) => updateKindValue(e)}
        ></DynamicDropDown>
      </Row>

      <SpecificDetails condition={condition} index={props.index}></SpecificDetails>
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
