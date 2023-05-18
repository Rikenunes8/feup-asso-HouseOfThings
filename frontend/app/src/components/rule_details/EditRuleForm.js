import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import DynamicTextInput from "../form/DynamicTextInput";
import ConditionForm from "../rule_form/condition/ConditionForm";
import ActionForm from "../rule_form/action/ActionForm";

export default function EditRuleForm({ inputOnFocus, setInputOnFocus, rule }) {
  const [ruleName, setRuleName] = useState(rule.name);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DynamicTextInput
        label={"NAME *"}
        name={ruleName}
        setName={setRuleName}
        inputOnFocus={inputOnFocus}
        setInputOnFocus={setInputOnFocus}
      />
      <ConditionForm></ConditionForm>
      <ActionForm></ActionForm>
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
