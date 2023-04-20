import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";

import DynamicTextInput from "../form/DynamicTextInput";
import ConditionForm from "./condition/ConditionForm";
import ActionForm from "./action/ActionForm";

import CreateRuleContext from "../../contexts/CreateRuleContext";

export default function CreateRuleForm({ inputOnFocus, setInputOnFocus }) {
  const { ruleName, setRuleName } = useContext(CreateRuleContext);

  return (
    <View style={styles.container}>
      <DynamicTextInput
        label={"NAME *"}
        name={ruleName ?? ""}
        setName={setRuleName}
        inputOnFocus={inputOnFocus}
        setInputOnFocus={setInputOnFocus}
      />
      <ConditionForm></ConditionForm>
      <ActionForm></ActionForm>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: 5,
  },
});
