import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import colors from "../../../configs/colors";

export default function NewRuleCard() {
  return (
    <TouchableOpacity
      style={styles.card}
      // TODO(RULES): onPress = show modal to create new rule
    >
      <Icon name={"plus"} size={25} color={colors.primaryText} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.transparent,
    borderColor: colors.primaryText,
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    padding: 20,
  },
});
