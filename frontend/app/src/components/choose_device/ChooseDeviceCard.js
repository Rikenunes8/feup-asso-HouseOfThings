import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, Text, Image } from "react-native";

import AddDeviceContext from "../../contexts/AddDeviceContext";
import ModalsContext from "../../contexts/ModalsContext";

import utils from "../../utils/utils";
import colors from "../../../configs/colors";
import api from "../../api/api";

export default function ChooseDeviceCard({ type }) {
  const { deviceGroup, setDeviceType, setAvailableDevices } =
    useContext(AddDeviceContext);

  const {
    setChooseDeviceModalVisible,
    setAddDeviceFormModalVisible,
    setIsChooseDeviceModalLoading,
  } = useContext(ModalsContext);

  chooseDeviceTypeHandler = () => {
    setIsChooseDeviceModalLoading(true);
    api.availableDevices({ group: deviceGroup }).then((devices) => {
      devices = utils.removeDuplicates(devices);

      setDeviceType(type);
      setAvailableDevices(devices);
      setIsChooseDeviceModalLoading(false);
      if (0 === devices.length) {
        utils.showErrorMessage(
          `No ${deviceGroup} device found!`
        );
        return;
      }

      setChooseDeviceModalVisible(false);
      setAddDeviceFormModalVisible(true);
    });
  };

  function getDeviceImage(type) {
    //TODO: List to be extended
    switch(type) {
      case 'light':
        return require("../../../../assets/lightbulb.png")
      default:
        return require("../../../../assets/lightbulb.png")
    }
  }

  return (
    <TouchableOpacity
      key={type}
      style={styles.card}
      onPress={() => chooseDeviceTypeHandler(type)}
    >
      <Image
        style={styles.cardImage}
        source={getDeviceImage(type)}
      />
      <Text style={styles.cardText}>{type}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "space-around",
    width: "45%",
    height: 120,
    paddingHorizontal: "5%",
    marginVertical: "8%",
  },
  cardImage: {
    width: 80,
    height: 80,
    objectFit: "contain",
  },
  cardText: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: "5%",
    textTransform: "capitalize",
    color: colors.primaryText,
  },
});
