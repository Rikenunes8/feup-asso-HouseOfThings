import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  View,
  ScrollView,
} from "react-native";

import Header from "../components/header/Header";
import RuleCard from "../components/rule_cards/RuleCard";
import NewRuleCard from "../components/rule_cards/NewRuleCard";
import RulesContext from "../contexts/RulesContext";

import colors from "../../configs/colors";
import api from "../api/api";
import { CreateRuleProvider } from "../contexts/CreateRuleContext";

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

        <ScrollView style={styles.scrollBody}>
          {rules.map((rule) => (
            <RuleCard key={rule.id} rule={rule} />
          ))}
          <CreateRuleProvider>
            <NewRuleCard/>
          </CreateRuleProvider>
        </ScrollView>
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
    paddingBottom: 5,
  },
  scrollBody: {
    marginBottom: 110,
    width: "100%",
  },
});
