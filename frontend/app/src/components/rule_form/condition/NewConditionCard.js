import React, { useState, useContext } from "react";
import { StyleSheet, View, Dimensions } from "react-native";

import DevicesContext from "../../../contexts/DevicesContext";
import CreateRuleContext from "../../../contexts/CreateRuleContext";

import utils from "../../../utils/utils";
import colors from "../../../../configs/colors";

import SpecificDetails from "./SpecificDetails";
import DynamicDropDown from "../../form/DynamicDropDown";
import DeletableCard from "../../DeletableCard";

export default function NewConditionCard(props) {
  const { devices } = useContext(DevicesContext);
  const { addRuleCondition } = useContext(CreateRuleContext);
  const [info, setInfo] = useState({});

  const [type, setType] = useState(
    !props.condition
      ? {}
      : props.condition.kind == "device"
      ? props.condition.device_id
      : "time"
  );

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
      capabilities = capabilities.filter((capability) => capability != "color");
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

    setInfo(
      props.condition ? all_items.find((item) => item.value == type) : {}
    );

    return all_items;
  });

  const handleTypeChange = (item) => {
    setType(item.value);
    setInfo(item);
    x =
      item.parent == "device"
        ? { kind: item.parent, device_id: item.value }
        : { kind: item.parent };
    addRuleCondition(props.index, x);
  };

  const modalProps = {
    transparent: true,
    presentationStyle: "overFullScreen",
  };

  return (
    <DeletableCard
      deleteDisabled={props.deleteDisabled}
      handleDelete={props.handleDelete}
    >
      <View style={styles.container}>
        <DynamicDropDown
          items={items}
          setItems={setItems}
          value={type}
          setValue={setType}
          listMode={"MODAL"}
          modalProps={modalProps}
          modalContentContainerStyle={styles.modalContent}
          onSelectItem={(e) => handleTypeChange(e)}
          hasCategory={true}
        />

        {type != {} ? (
          <SpecificDetails
            type={info.parent}
            index={props.index}
            capabilities={info.capabilities}
            category={info.category}
            condition={props.condition}
          ></SpecificDetails>
        ) : null}
      </View>
    </DeletableCard>
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
    marginHorizontal: 3,
    marginVertical: 10,
    paddingHorizontal: 5,
    zIndex: 0,
  },
  modalContent: {
    backgroundColor: colors.white,
    paddingHorizontal: 28,
    marginHorizontal: 0,
    paddingBottom: 25,
    marginTop:
      67 +
      Dimensions.get("window").height *
        (Platform.OS === "android" ? 0.15 : 0.3),
    borderRadius: 30,
  },
});
