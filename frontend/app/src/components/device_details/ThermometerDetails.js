import React from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../../../configs/colors";
import utils from "../../utils/utils";

export default function ThermometerDetails({ temperature }) {
  const isCold = utils.isTemperatureCold(temperature);
  const stateText = isCold ? "Cold" : "Hot";

  return (
    <View style={styles().container}>
      <View style={styles().detailsView}>
        <Text style={styles().temperatureText}>Temperature: </Text>
        <Text style={styles(isCold).stateText}>{stateText}</Text>
      </View>
      <View style={styles().circleView}>
        <View style={styles().circle}>
          <View style={styles(isCold).circleOppacity}>
            <Text>{temperature}°C</Text>
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
      backgroundColor: isCold ? colors.active : colors.desactive,
      borderRadius: 100,
    },
    circleView: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    stateText: {
      fontWeight: "bold",
      fontSize: 18,
      color: isCold ? colors.active : colors.desactive,
    },
  });
