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
  const [type, setType] = useState(null);
  const [info, setInfo] = useState({});
  const { devices } = useContext(DevicesContext);
  const { addRuleCondition } = useContext(CreateRuleContext);

  const handleTypeChange = (item) => {
    setInfo(item);
    x =
      item.parent == "device"
        ? { kind: item.parent, device_id: item.value }
        : { kind: item.parent };
    addRuleCondition(props.index, x);
  };

  const [items, setItems] = useState(() => {
    fixed_fields = [
      "category",
      "connected",
      "divisions",
      "name",
      "protocol",
      "subcategory",
      "uid",
    ];
    all_items = [
      { label: "Time", value: "time", parent: "schedule" },
      { label: "Schedule", value: "schedule" },
    ];
    devices.map((item) => {
      capabilities = Object.keys(item).filter(
        (key) => !fixed_fields.includes(key)
      );
      all_items.push({
        label: utils.capitalize(item.name),
        value: item.uid,
        parent: "device",
        category: item.category,
        capabilities: capabilities,
      });
    });

    if (devices.length != 0)
      all_items.push({ label: "Devices", value: "device" });

    return all_items;
  });

  const modalProps = {
    transparent: true,
    presentationStyle: "overFullScreen",
  };

  return (
    <View style={styles.container}>
      <Row>
        <DynamicDropDown
          items={items}
          setItems={setItems}
          value={type}
          setValue={setType}
          listMode={"MODAL"}
          modalProps={modalProps}
          modalContentContainerStyle={styles.modalContent}
          onSelectItem={(e) => handleTypeChange(e)}
        ></DynamicDropDown>
      </Row>

      {type != {} ? (
        <SpecificDetails
          type={info.parent}
          index={props.index}
          capabilities={info.capabilities}
          category={info.category}
        ></SpecificDetails>
      ) : null}
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
    elevation: 3,
    padding: 15,
    marginVertical: 10,
    paddingHorizontal: 20,
    zIndex: 0,
  },
  modalContent: {
    backgroundColor: colors.white,
    marginHorizontal: 28,
    marginBottom: 25,
    marginTop: "92.5%",
  },
});
