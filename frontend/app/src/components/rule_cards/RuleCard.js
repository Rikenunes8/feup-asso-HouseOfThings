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
  // TODO(RULES): make content scrollable
  return (
    <TouchableOpacity
      style={styles.ruleCard}
      // onPress= show modal with rule details
    >
      <View style={{ justifyContent: "center" }}>
        <Text style={styles.ruleName}>{rule.name}</Text>
        <Text style={styles.ruleText}>
          {getRuleNumActions(rule.actions)}{" "}
          <Text style={styles.ruleParenthesis}>
            ({getRuleType(rule.triggers.type)})
          </Text>
        </Text>
      </View>

      {rule.triggers.type === "MANUAL" && (
        <TouchableOpacity>
          {/* TODO(RULES): change icon */}
          <Icon name={"plus"} size={35} color={colors.primaryText} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ruleCard: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderRadius: 15,
    marginVertical: 10,
    padding: 15,
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
});
