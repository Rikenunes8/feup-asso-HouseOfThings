import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import DevicesContext from "../../contexts/DevicesContext";

import colors from "../../../configs/colors";
import api from "../../api/api";

export default function ChooseDeviceCard({ type }) {
  const { addDevice } = useContext(DevicesContext);

  // TODO: Change hardecoded and use a different logic for device type
  addDeviceHandler = () => {
    if (type === "light bulb") {
      console.log(`Adding ${type}...`);

      api.addDevice("1").then((success) => {
        success
          ? addDevice({
              id: "1",
              name: "Light Bulb",
              division: "Living Room",
              enabled: false,
            })
          : console.log("Failed to add device");
      });
    }
  };

  return (
    <TouchableOpacity
      key={type}
      style={styles.card}
      onPress={() => addDeviceHandler(type)}
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
