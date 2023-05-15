import React, { useContext } from "react";
import { ScrollView, StyleSheet } from "react-native";

import ConditionForm from "../rule_form/condition/ConditionForm";
import ActionForm from "../rule_form/action/ActionForm";

export default function RuleDetails({ rule }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ConditionForm conditions={rule.when} />
      <ActionForm actions={rule.then} />
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
