import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, Text, Image } from "react-native";

import AddDeviceContext from "../../contexts/AddDeviceContext";
import ModalsContext from "../../contexts/ModalsContext";

import colors from "../../../configs/colors";
import api from "../../api/api";

export default function ChooseDeviceCard({ type }) {
  const { setDeviceType, setAvailableDevices } = useContext(AddDeviceContext);
  const { setChooseDeviceModalVisible, setAddDeviceFormModalVisible } =
    useContext(ModalsContext);

  chooseDeviceTypeHandler = () => {
    api.availableDevices({ group: "light" }).then((devices) => {
      setDeviceType(type);
      setAvailableDevices(devices);
      setChooseDeviceModalVisible(false);
      setAddDeviceFormModalVisible(true);
    });
  };

  return (
    <TouchableOpacity
      key={type}
      style={styles.card}
      onPress={() => chooseDeviceTypeHandler(type)}
    >
      <Image
        style={styles.cardImage}
        source={require("../../../../assets/lightbulb.png")} //TODO: Change this to a dynamic image
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
