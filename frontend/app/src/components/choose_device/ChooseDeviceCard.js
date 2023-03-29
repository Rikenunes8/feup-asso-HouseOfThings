import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, Text, Image } from "react-native";

import AddDeviceContext from "../../contexts/AddDeviceContext";
import ModalsContext from "../../contexts/ModalsContext";

import utils from "../../utils/utils";
import colors from "../../../configs/colors";
import api from "../../api/api";

import { getDeviceImage } from "../../utils/DevicePropsUtils";

export default function ChooseDeviceCard({ subcategory }) {
  const { setDeviceSubcategory, setAvailableDevices } =
    useContext(AddDeviceContext);

  const {
    setChooseDeviceModalVisible,
    setAddDeviceFormModalVisible,
    setIsChooseDeviceModalLoading,
  } = useContext(ModalsContext);

  chooseDeviceTypeHandler = () => {
    setIsChooseDeviceModalLoading(true);
    api.availableDevices({ 'subcategory': subcategory }).then((devicesIds) => {
      devicesIds = utils.removeDuplicates(devicesIds);

      setDeviceSubcategory(subcategory);
      setAvailableDevices(devicesIds);
      setIsChooseDeviceModalLoading(false);
      if (0 === devicesIds.length) {
        utils.showErrorMessage(
          `No ${subcategory} device found!`
        );
        return;
      }

      setChooseDeviceModalVisible(false);
      setAddDeviceFormModalVisible(true);
    });
  };

  return (
    <TouchableOpacity
      key={subcategory}
      style={styles.card}
      onPress={() => chooseDeviceTypeHandler(subcategory)}
    >
      <Image
        style={styles.cardImage}
        source={getDeviceImage(subcategory)}
      />
      <Text style={styles.cardText}>{subcategory}</Text>
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
