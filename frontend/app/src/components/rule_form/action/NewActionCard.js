import React, { useState, useContext } from "react";
import { StyleSheet, View, Dimensions } from "react-native";

import DevicesContext from "../../../contexts/DevicesContext";
import CreateRuleContext from "../../../contexts/CreateRuleContext";

import Row from "../../grid/Row";
import DynamicDropDown from "../../form/DynamicDropDown";
import DeviceForm from "../DeviceForm";
import DeletableCard from "../../DeletableCard";

import utils from "../../../utils/utils";
import colors from "../../../../configs/colors";

export default function NewActionCard(props) {
  const { addRuleAction } = useContext(CreateRuleContext);
  const { devices } = useContext(DevicesContext);
  const [device, setDevice] = useState(null);
  const [info, setInfo] = useState({});

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
    all_items = [];
    devices.map((item) => {
      capabilities = Object.keys(item).filter(
        (key) => !fixed_fields.includes(key)
      );
      all_items.push({
        label: utils.capitalize(item.name),
        value: item.uid,
        category: item.category,
        capabilities: capabilities,
      });
    });
    console.log("All Items:", all_items);
    return all_items;
  });

  const handleDeviceChange = (item) => {
    setInfo(item);
    addRuleAction(props.index, { device_id: item.value });
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
          value={device}
          setValue={setDevice}
          listMode={"MODAL"}
          modalProps={modalProps}
          modalContentContainerStyle={styles.modalContent}
          onSelectItem={(e) => handleDeviceChange(e)}
        ></DynamicDropDown>

        <Row>
          <DeviceForm
            index={props.index}
            category={info.category}
            isRuleCondition={false}
            capabilities={info.capabilities}
          />
        </Row>
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
