import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../../../configs/colors";

export default function DivisionCard({ division }) {
  return (
    <TouchableOpacity
      style={styles.divisionCard}
      //   onPress={() => setIsDetailsModalVisible(!isDetailsModalVisible)}
    >
      <Icon name={"plus"} size={35} color={colors.primaryText} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  divisionCard: {
    width: 130,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.transparent,
    borderRadius: 15,
    marginVertical: 10,
    padding: 10,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: colors.primaryText,
  },
});
