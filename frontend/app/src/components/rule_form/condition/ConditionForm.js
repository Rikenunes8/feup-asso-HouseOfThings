import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import NewConditionCard from "./NewConditionCard";

import AntDesignIcon from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import CreateRuleContext from "../../../contexts/CreateRuleContext";

import colors from "../../../../configs/colors";
import NewActionCard from "../action/NewActionCard";
import RuleOperationMenu from "./RuleOperationMenu";

export default function ConditionForm({}) {
  const { ruleOperation, setRuleOperation, ruleConditions } =
    useContext(CreateRuleContext);

  const [numConditionCards, setNumConditionCards] = useState(1);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  //TODO: Include the manual
  const operations = ["AND", "OR"];

  const changeOperation = (item) => {
    setRuleOperation(item.toLowerCase())
    setIsContextMenuVisible(false);
  };

  const addConditionCard = () => {
    setNumConditionCards(numConditionCards + 1);
  };

  useEffect(() => {
    console.log("RULE OP:", ruleOperation)
  }, [ruleOperation]);

  // TODO: Make the selected other color
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>WHEN</Text>

        <RuleOperationMenu
          isContextMenuVisible={isContextMenuVisible}
          options={operations}
          callback={changeOperation}
        />
        <SimpleLineIcons
          name={"settings"}
          size={20}
          color={colors.primary}
          style={styles.plus_icon}
          onPress={() => setIsContextMenuVisible(!isContextMenuVisible)}
        />

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
    zIndex: 1,
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
