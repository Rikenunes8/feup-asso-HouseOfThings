import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import AntDesignIcon from "react-native-vector-icons/AntDesign";

import colors from "../../../../configs/colors";
import NewActionCard from "./NewActionCard";
import CreateRuleContext from "../../../contexts/CreateRuleContext";

export default function ActionForm() {
  const { ruleActions, setRuleActions } = useContext(CreateRuleContext);
  const [numActionsCards, setNumActionsCards] = useState(1); 

  const addActionCard = () => {
    setNumActionsCards(numActionsCards + 1);
  };

  useEffect(() => {
    console.log("RULE ACTION:", ruleActions)
  }, [ruleActions]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>THEN</Text>
        <AntDesignIcon
          name={"plus"}
          size={20}
          color={colors.primary}
          style={styles.setting_icon}
          onPress={addActionCard}
        />
      </View>
      {[...Array(numActionsCards)].map((_, index) => (
        <NewActionCard index={index} key={index} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    width: "90%",
  },
  header: {
    flexDirection: "row",
  },
  title: {
    flexGrow: 1,
    fontSize: 15,
    color: colors.primary,
  },
  plus_icon: {
    flexGrow: 0,
    marginRight: 5,
    //backgroundColor: colors.black,
  },
});
