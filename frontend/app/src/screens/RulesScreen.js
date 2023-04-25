import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import Header from "../components/header/Header";
import RuleCard from "../components/rule_cards/RuleCard";
import NewRuleCard from "../components/rule_cards/NewRuleCard";
import RulesContext from "../contexts/RulesContext";

import colors from "../../configs/colors";
import api from "../api/api";

export default function RulesScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const { rules, setRules } = useContext(RulesContext);

  const fetchRules = async () => {
    setIsLoading(true);
    const rules = await api.getRules();
    setIsLoading(false);
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

        {isLoading && (
          <ActivityIndicator
            size={"large"}
            color={colors.white}
            style={styles.loadingIndicator}
          />
        )}

        <ScrollView style={styles.scrollBody}>
          {rules.map((rule) => (
            <RuleCard key={rule.id} rule={rule} />
          ))}

          <NewRuleCard />
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
  loadingIndicator: {
    width: "100%",
    marginVertical: 10,
  },
});
