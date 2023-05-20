import React, { useContext } from "react";

import ContextMenu from "../ContextMenu";
import RulesContext from "../../contexts/RulesContext";
import ModalsContext from "../../contexts/ModalsContext";

import colors from "../../../configs/colors";
import api from "../../api/api";
import utils from "../../utils/utils";
import CreateRuleContext from "../../contexts/CreateRuleContext";

export default function RuleDetailsContextMenu({
  rule,
  setIsEditingRule,
  isContextMenuVisible,
  setIsContextMenuVisible,
}) {
  const { removeRule } = useContext(RulesContext);

  const { setRuleName, setRuleOperation, setRuleConditions, setRuleActions } =
    useContext(CreateRuleContext);

  const { setRuleDetailsModalVisible, setIsRuleDetailsModalLoading } =
    useContext(ModalsContext);

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

  const editCallback = () => {
    setIsContextMenuVisible(false);
    setIsEditingRule(true);
    setRuleName(rule.name);
    setRuleOperation(rule.operation);
    setRuleConditions(rule.when);
    setRuleActions(rule.then);
  };

  return (
    <ContextMenu
      isContextMenuVisible={isContextMenuVisible}
      setIsContextMenuVisible={setIsContextMenuVisible}
      options={[
        {
          name: "Edit",
          icon: "edit-2",
          color: colors.primaryText,
          callback: editCallback,
        },
        {
          name: "Delete",
          icon: "trash-2",
          color: colors.red,
          callback: deleteCallback,
        },
      ]}
    />
  );
}
