import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";

import DevicesContext from "../../../contexts/DevicesContext";
import CreateRuleContext from "../../../contexts/CreateRuleContext";

import Row from "../../grid/Row";
import DynamicDropDown from "../../form/DynamicDropDown";
import DeviceForm from "../DeviceForm";

import utils from "../../../utils/utils";
import colors from "../../../../configs/colors";

export default function NewActionCard(props) {
  const { addARulection } = useContext(CreateRuleContext);
  const { devices } = useContext(DevicesContext);
  const [device, setDevice] = useState({});

  const [items] = useState(
    devices.map((item) => {
      return {
        label: utils.capitalize(item.name),
        value: item.uid,
        category: item.category,
      };
    })
  );

  const handleDeviceChange = (item) => {
    setDevice(item);
    addRuleAction(props.index, { device_id: item.value });
  };

  return (
    <View style={styles.container}>
      <Row>
        <DynamicDropDown
          items={items}
          value={device}
          setValue={setDevice}
          onChange={(e) => handleDeviceChange(e)}
        ></DynamicDropDown>
      </Row>
      <Row>
        <DeviceForm index={props.index} category={device.category} isRuleCondition={false}/>
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
    marginVertical: 10,
    paddingHorizontal: 20,
  },
});
