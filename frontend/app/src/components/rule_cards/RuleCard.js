import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import colors from "../../../configs/colors";

export default function RuleCard({ rule }) {
  getRuleName = () => {
    return rule.name;
  };

  getRuleDescription = () => {
    const nconditions = rule.when.length;
    const nactions = rule.then.length;

    const conds = nconditions + " condition" + (nconditions === 1 ? "" : "s");
    const acts = nactions + " action" + (nactions === 1 ? "" : "s");
    return conds + ", " + acts;
  };

  getRuleOperation = () => {
    return rule.operation;
  };

  return (
    <TouchableOpacity
      style={styles.ruleCard}
      // TODO(RULES): onPress = show modal with rule details
    >
      <View>
        <Text style={styles.ruleName}>{getRuleName()}</Text>
        <Text style={styles.ruleText}>
          <Text style={styles.ruleParenthesis}>
            {"(" + getRuleOperation() + ") "}
          </Text>
          {getRuleDescription()}
        </Text>
      </View>

      <TouchableOpacity style={styles.ruleExecute}>
        {/* TODO(RULES): execute request */}
        <Icon name={"play"} size={25} color={colors.active} />
      </TouchableOpacity>
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
