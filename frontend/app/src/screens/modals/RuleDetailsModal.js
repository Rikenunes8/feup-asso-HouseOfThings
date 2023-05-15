import React, { useContext, useEffect } from "react";

import TitleModal from "../../components/modal/TitleModal";

import CreateRuleContext from "../../contexts/CreateRuleContext";
import RulesContext from "../../contexts/RulesContext";
import ModalsContext from "../../contexts/ModalsContext";

import utils from "../../utils/utils";
import api from "../../api/api";
import RuleDetails from "../../components/rule_details/RuleDetails";

export default function RuleDetailsModal({ rule }) {
  const { updateRule } = useContext(RulesContext);

  const {
    ruleDetailsModalVisible,
    setRuleDetailsModalVisible,
    isRuleDetailsModalLoading,
    setIsRuleDetailsModalLoading,
  } = useContext(ModalsContext);

  const {
    ruleName,
    ruleOperation,
    ruleConditions,
    ruleActions,
    resetCreateRuleContext,
  } = useContext(CreateRuleContext);

  useEffect(() => {
    console.log(ruleConditions);
  }, [ruleConditions]);

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
        setRuleDetailsModalVisible(false);
        // resetCreateRuleContext();
      } else {
        utils.showErrorMessage("Failed to update rule");
      }
    });
  };

  return (
    <TitleModal
      visible={ruleDetailsModalVisible}
      title={rule.name}
      leftIcon={"close"}
      rightIcon={"ellipsis1"}
      leftIconCallback={() => {
        setRuleDetailsModalVisible(false);
        //resetCreateRuleContext();
      }}
      rightIconCallback={() => {
        //TODO
      }}
      modalContent={RuleDetails({
        rule: rule,
      })}
      isLoading={isRuleDetailsModalLoading}
    />
  );
}
