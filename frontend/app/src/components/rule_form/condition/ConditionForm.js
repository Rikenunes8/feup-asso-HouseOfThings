import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import NewConditionCard from "./NewConditionCard";

import AntDesignIcon from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import CreateRuleContext from "../../../contexts/CreateRuleContext";

import colors from "../../../../configs/colors";
import NewActionCard from "../action/NewActionCard";

export default function ConditionForm({}) {
  const { ruleOperation, setRuleOperation , ruleConditions} = useContext(CreateRuleContext);

  const [numConditionCards, setNumConditionCards] = useState(1);

  const operations = [
    { label: "AND", value: 0 },
    { label: "OR", value: 1 },
    { label: "MANUAL", value: 2 },
  ];
  
  const changeOperation = () =>
  {
    console.log("PRESSED the setting button")
  }

  const addConditionCard = () => {
    setNumConditionCards(numConditionCards + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>WHEN</Text>
        <TouchableOpacity>
        <SimpleLineIcons
          name={"settings"}
          size={20}
          color={colors.primary}
          style={styles.plus_icon}
          onPress={() => changeOperation()}
        />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesignIcon
            name={"plus"}
            size={20}
            color={colors.primary}
            style={styles.setting_icon}
            onPress={() => addConditionCard()}
          />
        </TouchableOpacity>
      </View>
     
      {[...Array(numConditionCards)].map((_, index) => (
        <NewConditionCard index={index} key={index} />
      ))}
    </View>
  );
}

/*
 */

const styles = StyleSheet.create({
  container: {
    margin: 20,
    width: "90%",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
  },
  title: {
    flexGrow: 1,
    fontSize: 15,
    color: colors.primary,
    //backgroundColor: colors.red,
  },
  plus_icon: {
    flexGrow: 0,
    marginRight: 5,
    //backgroundColor: colors.black,
  },
  setting_icon: {
    flexGrow: 0,
  },
});
