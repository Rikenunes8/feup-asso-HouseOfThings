import React, { useContext, useEffect, useState } from "react";

import TitleModal from "../../components/modal/TitleModal";

import CreateRuleContext from "../../contexts/CreateRuleContext";
import RulesContext from "../../contexts/RulesContext";
import ModalsContext from "../../contexts/ModalsContext";
import ContextMenu from "../../components/ContextMenu";

import utils from "../../utils/utils";
import api from "../../api/api";
import RuleDetails from "../../components/rule_details/RuleDetails";

import colors from "../../../configs/colors";

export default function RuleDetailsModal({ rule }) {
  const { updateRule, removeRule } = useContext(RulesContext);

  const {
    ruleDetailsModalVisible,
    setRuleDetailsModalVisible,
    isRuleDetailsModalLoading,
    setIsRuleDetailsModalLoading,
  } = useContext(ModalsContext);

  const { ruleName, ruleOperation, ruleConditions, ruleActions } =
    useContext(CreateRuleContext);

  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  useEffect(() => {}, [ruleConditions]);

  // TODO: Função que valida a questão da operation
  const updateCallback = () => {
    const updatedRule = {
      name: ruleName,
      operation: ruleOperation,
      when: ruleConditions,
      then: ruleActions,
    };

    console.log("Updating RULE", id, updatedRule);
    setIsRuleDetailsModalLoading(true);

    api.updateRule(rule.id, updatedRule).then((updatedRule) => {
      setIsRuleDetailsModalLoading(false);
      if (updatedRule != null) {
        updateRule(updatedRule);
        setRuleDetailsModalVisible(null);
      } else {
        utils.showErrorMessage("Failed to update rule");
      }
    });
  };

  const deleteCallback = () => {
    utils.showConfirmDialog(
      "Delete rule",
      "Are you sure you want to delete this rule?",
      () => {
        console.log("Deleting rule...");
        setIsRuleDetailsModalLoading(true);

        api.deleteRule(rule.id).then((success) => {
          setIsRuleDetailsModalLoading(false);
          setIsContextMenuVisible(false);

          if (success) {
            console.log("Rule delelted successfully");
            setRuleDetailsModalVisible(null);
            removeRule(rule.id);
            return;
          }

          console.log("Failed to delete rule");
          utils.showErrorMessage("Failed to delete rule");
        });
      },
      () => {
        console.log("Canceling delete rule...");
      }
    );
  };

  return (
    <TitleModal
      visible={ruleDetailsModalVisible === rule.id}
      title={rule.name}
      leftIcon={"close"}
      rightIcon={"ellipsis1"}
      leftIconCallback={() => {
        setRuleDetailsModalVisible(null);
      }}
      rightIconCallback={() => {
        setIsContextMenuVisible(!isContextMenuVisible);
      }}
      modalContent={RuleDetails({
        rule: rule,
      })}
      contextMenu={
        <ContextMenu
          isContextMenuVisible={isContextMenuVisible}
          setIsContextMenuVisible={setIsContextMenuVisible}
          options={[
            {
              name: "Edit",
              icon: "edit-2",
              color: colors.primaryText,
              callback: () => console.log("TODO: Edit Rule"),
            },
            {
              name: "Delete",
              icon: "trash-2",
              color: colors.red,
              callback: deleteCallback,
            },
          ]}
        />
      }
      isLoading={isRuleDetailsModalLoading}
    />
  );
}
