import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableOpacity,
} from "react-native";

import DevicesContext from "../../../contexts/DevicesContext";
import CreateRuleContext from "../../../contexts/CreateRuleContext";

import Row from "../../grid/Row";
import DynamicDropDown from "../../form/DynamicDropDown";
import DeviceForm from "../DeviceForm";

import utils from "../../../utils/utils";
import colors from "../../../../configs/colors";
import Icon from "react-native-vector-icons/AntDesign";

import { Swipeable } from "react-native-gesture-handler";

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

  const leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity
        onPress={props.handleDelete}
        activeOpacity={0.6}
        style={styles.deleteBox}
      >
        <View>
          <Animated.View style={{ transform: [{ scale: scale }] }}>
            <Icon name={"delete"} size={30} color={colors.white} />
          </Animated.View>
        </View>
      </TouchableOpacity>
    );
  };

  console.log(info);
  return (
    <Swipeable renderLeftActions={leftSwipe}>
      <View style={styles.container}>
        <Row>
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
        </Row>
        <Row>
          <DeviceForm
            index={props.index}
            category={info.category}
            isRuleCondition={false}
            capabilities={info.capabilities}
          />
        </Row>
      </View>
    </Swipeable>
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
    marginHorizontal: 3,
  },
  modalContent: {
    backgroundColor: colors.white,
    marginHorizontal: 28,
    marginBottom: 25,
    marginTop: "92.5%",
  },
  deleteBox: {
    backgroundColor: colors.red,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    marginVertical: 10,
    width: 90,
    zIndex: 0,
  },
  disabled: {
    backgroundColor: colors.desactive,
  },
});
