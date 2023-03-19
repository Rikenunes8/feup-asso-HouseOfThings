import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import DevicesContext from "../../contexts/DevicesContext";

import colors from "../../../configs/colors";
import api from "../../api/api";

export default function ChooseDeviceCard({ type }) {
  const { addDevice } = useContext(DevicesContext);

  addDeviceHandler = () => {

    console.log(`Adding ${type}...`);
    let id = Math.random();

    switch (type) {
      case "light bulb":
        api.addDevice(id, type).then((success) => {
        success
          ? addDevice({
              uid: id,
              name: "Light Bulb",
              type: "light bulb",
              division: "Living Room", //TODO: Change this later
              enabled: false,
            })
          : console.log("Failed to add device");
        });
        break;
      default:
        break;
    }
  }

  function getDeviceImage(type){
    switch (type) {
      case "light bulb":
        return require("../../../../assets/lightbulb.png");
      default:
        require("../../../../assets/lightbulb.png");
    }
  }

  return (
    <TouchableOpacity
      key={type}
      style={styles.card}
      onPress={() => addDeviceHandler(type)}
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
