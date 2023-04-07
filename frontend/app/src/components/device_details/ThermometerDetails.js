import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import colors from "../../../configs/colors";
import utils from "../../utils/utils";

export default function ThermometerDetails({ temperature }) {
  const isCold = utils.isTemperatureCold(temperature);
  const stateText = isCold ? "Cold" : "Hot";

  return (
    <View style={styles().container}>
      <View style={styles().detailsView}>
        <Text style={styles().temperatureText}>Temperature: </Text>
        <Text style={styles(isCold).stateText}>
          {stateText}{" "}
          <Image
            style={styles().temperatureIcon}
            source={
              isCold
                ? require("../../../../assets/temperature/cold.png")
                : require("../../../../assets/temperature/warm.png")
            }
          />
        </Text>
      </View>
      <View style={styles().circleView}>
        <View style={styles().circle}>
          <View style={styles(isCold).circleOppacity}>
            <Text style={styles().circleText}>{temperature}°C</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = (isCold = false) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      marginVertical: 5,
    },
    detailsView: {
      flexDirection: "row",
      alignItems: "center",
    },
    temperatureText: {
      fontWeight: "bold",
      fontSize: 18,
      color: colors.primaryText,
    },
    stateText: {
      fontWeight: "bold",
      fontSize: 18,
      color: isCold ? colors.cold : colors.warm,
    },
    temperatureIcon: {
      width: 18,
      height: 18,
      objectFit: "contain",
    },
    circle: {
      padding: 15,
      backgroundColor: colors.white,
      borderRadius: 100,
      shadowColor: colors.gray,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 3.5,
      elevation: 2,
    },
    circleOppacity: {
      padding: 20,
      backgroundColor: isCold ? colors.cold : colors.warm,
      borderRadius: 100,
    },
    circleView: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    circleText: {
      height: 50,
      width: 50,
      fontSize: 22,
      fontWeight: "900",
      color: colors.white,
      textAlign: "center",
      textAlignVertical: "center",
    },
  });
