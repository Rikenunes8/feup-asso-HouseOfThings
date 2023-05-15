import React, { useState, useContext } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import DevicesContext from "../../contexts/DevicesContext";
import ModalsContext from "../../contexts/ModalsContext";
import RuleDetails from "../rule_details/RuleDetails";

import colors from "../../../configs/colors";
import api from "../../api/api";
import utils from "../../utils/utils";
import RuleDetailsModal from "../../screens/modals/RuleDetailsModal";

export default function RuleCard({ rule }) {
  const { updateDevice } = useContext(DevicesContext);
  const { setRuleDetailsModalVisible } = useContext(ModalsContext);

  const [isRuleExecuting, setIsRuleExecuting] = useState(false);

  const getName = () => {
    return rule.name;
  };

  const getDescription = () => {
    const nconditions = rule.when.length;
    const nactions = rule.then.length;

    const conds = nconditions + " condition" + (nconditions === 1 ? "" : "s");
    const acts = nactions + " action" + (nactions === 1 ? "" : "s");
    return conds + ", " + acts;
  };

  const getOperation = () => {
    return rule.operation;
  };

  const execute = () => {
    console.log(`Executing rule... [${rule.id}] ${rule.name}`);
    setIsRuleExecuting(true);

    api.executeRule(rule.id).then((devices) => {
      setIsRuleExecuting(false);

      if (devices != null) {
        console.log("Rule executed successfully");
        devices.forEach((device) => {
          updateDevice(device, device.uid);
        });
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
      onPress={() => {
        setRuleDetailsModalVisible(true);
      }}
    >
      <RuleDetailsModal rule={rule} />
      <View>
        <Text style={styles.ruleName}>{getName()}</Text>
        <Text style={styles.ruleText}>
          <Text style={styles.ruleParenthesis}>
            {"(" + getOperation() + ") "}
          </Text>
          {getDescription()}
        </Text>
      </View>

      {isRuleExecuting ? (
        <ActivityIndicator style={styles.ruleExecute} color={colors.gray} />
      ) : (
        <TouchableOpacity style={styles.ruleExecute} onPress={execute}>
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
