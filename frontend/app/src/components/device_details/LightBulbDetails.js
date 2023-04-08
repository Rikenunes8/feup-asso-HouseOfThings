import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import colors from "../../../configs/colors";

export default function LightBulbDetails({ on, handler }) {
  const stateText = on ? "On" : "Off";

  return (
    <View style={styles().container}>
      <View style={styles().detailsView}>
        <Text style={styles().lightText}>Light: </Text>
        <Text style={styles(on).stateText}>{stateText}</Text>
      </View>
      <View style={styles().powerButtonView}>
        <View style={styles().powerButton}>
          <TouchableOpacity
            style={styles(on).powerButtonOppacity}
            onPress={() => handler(on)}
          >
            <Icon name="power" size={50} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = (on = false) =>
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
    lightText: {
      fontWeight: "bold",
      fontSize: 18,
      color: colors.primaryText,
    },
    powerButton: {
      padding: 15,
      backgroundColor: colors.white,
      borderRadius: 100,
      shadowColor: colors.gray,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 3.5,
      elevation: 2,
    },
    powerButtonOppacity: {
      padding: 20,
      backgroundColor: on ? colors.active : colors.desactive,
      borderRadius: 100,
    },
    powerButtonView: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    stateText: {
      fontWeight: "bold",
      fontSize: 18,
      color: on ? colors.active : colors.desactive,
    },
  });
