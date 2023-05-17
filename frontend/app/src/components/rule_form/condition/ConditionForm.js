import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";

import ContextMenu from "../../ContextMenu";
import NewConditionCard from "./NewConditionCard";

import AntDesignIcon from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

import CreateRuleContext from "../../../contexts/CreateRuleContext";

import colors from "../../../../configs/colors";

export default function ConditionForm() {
  const { setRuleOperation } = useContext(CreateRuleContext);

  const [conditionCards, setConditionCards] = useState([
    { id: Date.now().toString() },
  ]);

  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  const changeOperation = (item) => {
    setRuleOperation(item);
    setIsContextMenuVisible(false);
  };

  const addConditionCard = () => {
    const newCard = { id: Date.now().toString() };
    setConditionCards([...conditionCards, newCard]);
  };

  const deleteConditionCard = (id) => {
    if (conditionCards.length > 1) {
      setConditionCards((prevCards) =>
        prevCards.filter((card) => card.id !== id)
      );
    }
  };

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

        <TouchableOpacity onPress={addConditionCard}>
          <AntDesignIcon
            name={"plus"}
            size={20}
            color={colors.primary}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View>
        {conditionCards.map((card, index) => (
          <NewConditionCard
            index={index}
            key={card.id}
            card={card}
            handleDelete={() => deleteConditionCard(card.id)}
          />
        ))}
      </View>
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
