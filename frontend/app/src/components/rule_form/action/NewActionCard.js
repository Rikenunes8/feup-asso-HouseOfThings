import React, { useState, useContext } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";

import DevicesContext from "../../../contexts/DevicesContext";
import CreateRuleContext from "../../../contexts/CreateRuleContext";
import DeviceAction from "./DeviceAction";

import utils from "../../../utils/utils";
import colors from "../../../../configs/colors";

import Row from "../../grid/Row";
import DynamicDropDown from "../../form/DynamicDropDown";

export default function NewActionCard(props) {
  const { addAction } = useContext(CreateRuleContext);
  const [ kindValue, setKindValue ] = useState({});
  const [ category, setCategory] = useState(null);
  const { devices } = useContext(DevicesContext);

  const [items] = useState(
    devices.map((item) => {
      return ({
        label: utils.capitalize(item.name),
        value: item.uid,
        category: item.category
      });
    })
  );

  const updateDeviceValue = (item) => {
    setCategory(item.category);
    addAction(props.index, {"device_id" : item.value})
  };

  return (
    <View style={styles.container}>
      <Row>
        <DynamicDropDown
          items={items}
          value={kindValue}
          setValue={setKindValue}
          onChange={(e) => updateDeviceValue(e)}
        ></DynamicDropDown>
      </Row>
      <Row>
        <DeviceAction index={props.index} category={category}/>
      </Row>
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
    paddingHorizontal: 20
  },
});
