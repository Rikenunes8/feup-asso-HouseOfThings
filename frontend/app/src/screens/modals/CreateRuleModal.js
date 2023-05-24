import React, { useContext } from "react";

import TitleModal from "../../components/modal/TitleModal";
import CreateRuleForm from "../../components/rule_form/CreateRuleForm";

import CreateRuleContext from "../../contexts/CreateRuleContext";
import RulesContext from "../../contexts/RulesContext";
import ModalsContext from "../../contexts/ModalsContext";

import utils from "../../utils/utils";
import api from "../../api/api";

export default function CreateRuleModal() {
  const { addRule } = useContext(RulesContext);
  const [inputOnFocus, setInputOnFocus] = React.useState(false);

  const {
    createRuleModalVisible,
    setCreateRuleModalVisible,
    isCreateRuleModalLoading,
    setIsCreateRuleModalLoading,
  } = useContext(ModalsContext);

  const {
    ruleName,
    ruleOperation,
    ruleConditions,
    ruleActions,
    resetCreateRuleContext,
  } = useContext(CreateRuleContext);

  const connectCallback = () => {
    const rule = {
      name: ruleName ?? "undefined",
      operation: ruleOperation,
      when: ruleConditions,
      then: ruleActions,
    };

    console.log("Adding Rule...", rule);
    setIsCreateRuleModalLoading(true);

    api.addRule(rule).then((newRule) => {
      setIsCreateRuleModalLoading(false);
      if (newRule != null) {
        addRule(newRule);
        setCreateRuleModalVisible(false);
        resetCreateRuleContext();
        console.log("Rule created successfully");
      } else {
        console.log("Failed to create rule");
        utils.showErrorMessage("Failed to create rule");
      }
    });
  };

  return (
    <TitleModal
      visible={createRuleModalVisible}
      title={"Create Rule"}
      leftIcon={"close"}
      rightIcon={"check"}
      leftIconCallback={() => {
        setCreateRuleModalVisible(false);
        resetCreateRuleContext();
        setInputOnFocus(false);
      }}
      rightIconCallback={() => {
        connectCallback();
      }}
      modalContent={
        <CreateRuleForm
          inputOnFocus={inputOnFocus}
          setInputOnFocus={setInputOnFocus}
        />
      }
      isLoading={isCreateRuleModalLoading}
    />
  );
}
