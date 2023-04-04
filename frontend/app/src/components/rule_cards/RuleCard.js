import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import colors from "../../../configs/colors";

export default function RuleCard({ rule }) {
  getRuleNumActions = (actions) => {
    const num = actions.length;
    return num + " action" + (num === 1 ? "" : "s");
  };

  getRuleType = (type) => {
    return type === "MANUAL" ? "Manual" : "Automatic";
  };

  // TODO(RULES): correct call to rule params to match backend
  return (
    <TouchableOpacity
      style={styles.ruleCard}
      // TODO(RULES): onPress = show modal with rule details
    >
      <View>
        <Text style={styles.ruleName}>{rule.name}</Text>
        <Text style={styles.ruleText}>
          {getRuleNumActions(rule.actions)}{" "}
          <Text style={styles.ruleParenthesis}>
            ({getRuleType(rule.triggers.type)})
          </Text>
        </Text>
      </View>

      {rule.triggers.type === "MANUAL" && (
        <TouchableOpacity style={styles.ruleExecute}>
          <Icon name={"play"} size={25} color={colors.active} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ruleCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderRadius: 15,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  ruleName: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.primaryText,
  },
  ruleText: {
    color: colors.secondaryText,
  },
  ruleParenthesis: {
    color: colors.secondaryText,
    textTransform: "uppercase",
    fontStyle: "italic",
  },
  ruleExecute: {
    marginLeft: 10,
  },
});
