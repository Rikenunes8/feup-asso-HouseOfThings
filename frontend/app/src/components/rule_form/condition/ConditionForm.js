import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

import NewConditionCard from "./NewConditionCard";

import AntDesignIcon from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import CreateRuleContext from "../../../contexts/CreateRuleContext";

import colors from "../../../../configs/colors";
import NewActionCard from "../action/NewActionCard";

export default function ConditionForm({}) {
  const { ruleConditions } = useContext(CreateRuleContext);

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
      {/*ruleConditions.map((index) => (
        <div key={index}>
          <NewConditionCard index={index}/>
        </div>
      ))*/}
      <NewConditionCard index={0}></NewConditionCard>
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
