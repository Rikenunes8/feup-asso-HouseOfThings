import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, Text, Image } from "react-native";

import AddDeviceContext from "../../contexts/AddDeviceContext";
import ModalsContext from "../../contexts/ModalsContext";

import utils from "../../utils/utils";
import api from "../../api/api";
import colors from "../../../configs/colors";

export default function ChooseDeviceCard({ subcategory }) {
  const { setDeviceSubcategory, setAvailableDevices } =
    useContext(AddDeviceContext);

  const {
    setChooseDeviceModalVisible,
    setAddDeviceFormModalVisible,
    setIsChooseDeviceModalLoading,
  } = useContext(ModalsContext);

  const parseAvailableDevices = (devices) => {
    return Object.keys(devices)
      .map((protocol) => {
        return devices[protocol].map((deviceId) => {
          return { uuid: deviceId, protocol };
        });
      })
      .flat();
  };

  const chooseDeviceTypeHandler = () => {
    setIsChooseDeviceModalLoading(true);
    api
      .availableDevices({ subcategory: subcategory })
      .then((devicesIdsByProtocol) => {
        const deviceIdsProtocols = parseAvailableDevices(devicesIdsByProtocol);

        setDeviceSubcategory(subcategory);
        setAvailableDevices(deviceIdsProtocols);
        setIsChooseDeviceModalLoading(false);
        if (0 === deviceIdsProtocols.length) {
          console.log(`No ${subcategory} device found!`);
          utils.showErrorMessage(`No ${subcategory} device found!`);
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
        source={utils.getDeviceIcon(subcategory)}
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
