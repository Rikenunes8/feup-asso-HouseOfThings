import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import colors from "../../../configs/colors";

export default function LightBulbDetails({ power, handler }) {
  const stateText = power ? "On" : "Off";
  const [disabled, setDisabled] = React.useState(false);

  return (
    <View style={styles().container}>
      <View style={styles().detailsView}>
        <Text style={styles().lightText}>Light: </Text>
        <Text style={styles(power).stateText}>{stateText}</Text>
      </View>
      <View style={styles().powerButtonView}>
        <View style={styles().powerButton}>
          <TouchableOpacity
            style={styles(power).powerButtonOppacity}
            onPress={() => handler(power, setDisabled)}
            disabled={disabled}
          >
            <Icon name="power" size={50} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = (power = false) =>
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
      backgroundColor: power ? colors.active : colors.desactive,
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
      color: power ? colors.active : colors.desactive,
    },
  });
