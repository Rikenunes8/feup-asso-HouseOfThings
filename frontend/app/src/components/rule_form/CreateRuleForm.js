import React, { useContext, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";

import DynamicTextInput from "../form/DynamicTextInput";
import ConditionForm from "./condition/ConditionForm";
import ActionForm from "./action/ActionForm";

import CreateRuleContext from "../../contexts/CreateRuleContext";

export default function CreateRuleForm({
  inputOnFocus,
  setInputOnFocus,
  rule,
}) {
  const { ruleName, setRuleName } = useContext(CreateRuleContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DynamicTextInput
        label={"NAME *"}
        name={ruleName ?? ""}
        setName={setRuleName}
        inputOnFocus={inputOnFocus}
        setInputOnFocus={setInputOnFocus}
      />
      <ConditionForm conditions={rule ? rule.when : null}></ConditionForm>
      <ActionForm actions={rule ? rule.then : null}></ActionForm>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});
