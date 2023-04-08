import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import ModalsContext from "../../contexts/ModalsContext";

import colors from "../../../configs/colors";
import api from "../../api/api";
import utils from "../../utils/utils";

export default function RuleCard({ rule }) {
  const { setIsRuleExecuteLoading } = useContext(ModalsContext);

  getName = () => {
    return rule.name;
  };

  getDescription = () => {
    const nconditions = rule.when.length;
    const nactions = rule.then.length;

    const conds = nconditions + " condition" + (nconditions === 1 ? "" : "s");
    const acts = nactions + " action" + (nactions === 1 ? "" : "s");
    return conds + ", " + acts;
  };

  getOperation = () => {
    return rule.operation;
  };

  const execute = () => {
    console.log(`Executing rule... [${rule.id}] ${rule.name}`);
    setIsRuleExecuteLoading(true);

    api.executeRule(rule.id).then((success) => {
      setIsRuleExecuteLoading(false);

      if (success) {
        console.log("Rule executed successfully");
        // TODO(RULES): update the context of the changed devices
        return;
      }

      console.log("Failed to execute rule");
      utils.showErrorMessage("Failed to execute rule");
    });
  };

  return (
    <TouchableOpacity
      style={styles.ruleCard}
      // TODO(RULES): onPress = show modal with rule details
    >
      <View>
        <Text style={styles.ruleName}>{getName()}</Text>
        <Text style={styles.ruleText}>
          <Text style={styles.ruleParenthesis}>
            {"(" + getOperation() + ") "}
          </Text>
          {getDescription()}
        </Text>
      </View>

      <TouchableOpacity style={styles.ruleExecute} onPress={execute}>
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
