import React, { useContext } from "react";
import { ScrollView, StyleSheet } from "react-native";

import DynamicTextInput from "../form/DynamicTextInput";
import ConditionForm from "./condition/ConditionForm";
import ActionForm from "./action/ActionForm";

import CreateRuleContext from "../../contexts/CreateRuleContext";

export default function CreateRuleForm({ inputOnFocus, setInputOnFocus }) {
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
      <ConditionForm></ConditionForm>
      <ActionForm></ActionForm>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 5,
    padding: 25,
  },
});
