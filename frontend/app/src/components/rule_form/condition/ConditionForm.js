import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

import NewConditionCard from "./NewConditionCard";

import AntDesignIcon from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

import DivisionsContext from "../../../contexts/DivisionsContext";
import CreateRuleContext from "../../../contexts/CreateRuleContext";

import colors from "../../../../configs/colors";
import DynamicDropDown from "../../form/DynamicDropDown";

export default function ConditionForm({}) {
  const { ruleConditions, setRuleConditions } = useContext(CreateRuleContext);
  const [ruleCondition, setRuleCondition] = useState({
    id: ruleConditions.length,
    kind: null,
  });
  const { divisions } = useContext(DivisionsContext);

  const isJsonInArray = (json, array) => {
    const jsonStr = JSON.stringify(json);
    return array.map((item) => JSON.stringify(item)).includes(jsonStr);
  };

  const addRuleCondition = (newItem) => {
    if (!isJsonInArray(newItem, ruleConditions)) {
      console.log("not in array");
      // Create a copy of the original array
      const newItems = [...ruleConditions];

      // Add the new item to the end of the array
      newItems.push(newItem);

      // Set the state to the updated array
      setRuleConditions(newItems);
    }
  };

  useEffect(() => {
    found = false;
    const newItems = ruleConditions.map((json) => {
      if (json.id === ruleCondition.id) {
        json = ruleCondition;
        found = true;
      }
      return json;
    });

    if (!found) {
      newItems.push(ruleCondition);
    }

    setRuleConditions(newItems);
    console.log(ruleConditions);
  }, [ruleCondition]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>WHEN</Text>
        <SimpleLineIcons
          name={"settings"}
          size={20}
          color={colors.primary}
          style={styles.plus_icon}
        />
        <AntDesignIcon
          name={"plus"}
          size={20}
          color={colors.primary}
          style={styles.setting_icon}
        />
      </View>
      {ruleConditions.map((trigger) => (
        <Text>
          {trigger.kind} {trigger.device}
        </Text>
      ))}

      <NewConditionCard
        ruleCondition={ruleCondition}
        setRuleCondition={setRuleCondition}
      ></NewConditionCard>
    </View>
  );
}

/*
 */

const styles = StyleSheet.create({
  container: {
    margin: 20,
    width: "90%",
    //backgroundColor:colors.active,
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
