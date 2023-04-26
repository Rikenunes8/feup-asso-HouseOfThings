import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import ContextMenu from "../../ContextMenu";
import NewConditionCard from "./NewConditionCard";

import AntDesignIcon from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

import CreateRuleContext from "../../../contexts/CreateRuleContext";

import colors from "../../../../configs/colors";

export default function ConditionForm() {
  const { setRuleOperation } = useContext(CreateRuleContext);

  const [numConditionCards, setNumConditionCards] = useState(1);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  const changeOperation = (item) => {
    setRuleOperation(item);
    setIsContextMenuVisible(false);
  };

  const addConditionCard = () => {
    setNumConditionCards(numConditionCards + 1);
  };

  //TODO: Include the manual
  const operations = [
    {
      name: "AND",
      icon: null,
      color: colors.black,
      callback: () => changeOperation("and"),
    },
    {
      name: "OR",
      icon: null,
      color: colors.black,
      callback: () => changeOperation("or"),
    },
  ];

  // TODO: Make the selected other color
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>WHEN</Text>

        <ContextMenu
          isContextMenuVisible={isContextMenuVisible}
          options={operations}
          position={[10, 30]}
          backgroundColor={colors.background}
        />
        <SimpleLineIcons
          name={"settings"}
          size={20}
          color={colors.primary}
          style={styles.icon}
          onPress={() => setIsContextMenuVisible(!isContextMenuVisible)}
        />

        <TouchableOpacity>
          <AntDesignIcon
            name={"plus"}
            size={20}
            color={colors.primary}
            style={styles.icon}
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

const styles = StyleSheet.create({
  container: {
    margin: 20,
    width: "90%",
  },
  header: {
    flexDirection: "row",
    zIndex: 1,
  },
  title: {
    flexGrow: 1,
    fontSize: 15,
    color: colors.primary,
  },
  icon: {
    flexGrow: 0,
    marginRight: 5,
  },
});
