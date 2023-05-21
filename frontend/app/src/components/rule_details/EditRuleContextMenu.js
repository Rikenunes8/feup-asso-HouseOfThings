import React, { useContext } from "react";

import ContextMenu from "../ContextMenu";
import CreateRuleContext from "../../contexts/CreateRuleContext";
import ModalsContext from "../../contexts/ModalsContext";
import RulesContext from "../../contexts/RulesContext";

import colors from "../../../configs/colors";
import api from "../../api/api";
import utils from "../../utils/utils";

export default function EditRuleContextMenu({
  rule,
  setIsEditingRule,
  isContextMenuVisible,
  setIsContextMenuVisible,
}) {
  const { updateRule } = useContext(RulesContext);

  const { setRuleDetailsModalVisible, setIsRuleDetailsModalLoading } =
    useContext(ModalsContext);

  const {
    ruleName,
    ruleOperation,
    ruleConditions,
    ruleActions,
    resetCreateRuleContext,
  } = useContext(CreateRuleContext);

  // TODO: Função que valida a questão da operation
  const updateCallback = () => {
    const updatedRule = {
      name: ruleName,
      operation: ruleOperation,
      when: ruleConditions,
      then: ruleActions,
    };

    console.log("Updating RULE:", rule);
    setIsRuleDetailsModalLoading(true);

    api.updateRule(rule.id, updatedRule).then((updatedRule) => {
      setIsRuleDetailsModalLoading(false);
      if (updatedRule != null) {
        updateRule(updatedRule, rule.id);
        setRuleDetailsModalVisible(null);
        resetCreateRuleContext();
        setIsContextMenuVisible(false);
        setIsEditingRule(false);
      } else {
        utils.showErrorMessage("Failed to update rule");
      }
    });
  };

  const cancelCallback = () => {
    setIsContextMenuVisible(false);
    setIsEditingRule(false);
  };

  return (
    <ContextMenu
      isContextMenuVisible={isContextMenuVisible}
      setIsContextMenuVisible={setIsContextMenuVisible}
      options={[
        {
          name: "Save",
          icon: "save",
          color: colors.active,
          callback: updateCallback,
        },
        {
          name: "Cancel",
          icon: "slash",
          color: colors.red,
          callback: cancelCallback,
        },
      ]}
    />
  );
}
