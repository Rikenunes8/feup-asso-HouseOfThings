import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  View,
} from "react-native";

import Header from "../components/header/Header";
import RuleCard from "../components/rule_cards/RuleCard";
import NewRuleCard from "../components/rule_cards/NewRuleCard";
import RulesContext from "../contexts/RulesContext";

import colors from "../../configs/colors";
import api from "../api/api";

export default function RulesScreen() {
  const { rules, setRules } = useContext(RulesContext);

  const fetchRules = async () => {
    const rules = await api.getRules();
    setRules(rules);
  };

  useEffect(() => {
    fetchRules();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.body}>
        <Text style={styles.sectionHeader}>Rules</Text>

        {rules.map((rule) => (
          <RuleCard key={rule.uid} rule={rule} />
        ))}

        <NewRuleCard />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
  },
  body: {
    flex: 0.85,
    width: "85%",
    alignItems: "flex-start",
    paddingVertical: 20,
  },
  sectionHeader: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.primary,
    paddingTop: 16,
  },
});
