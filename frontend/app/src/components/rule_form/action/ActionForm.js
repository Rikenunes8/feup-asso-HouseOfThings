import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import NewActionCard from "./NewActionCard";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

import colors from "../../../../configs/colors";

export default function ActionForm({ actions }) {
  const [actionCards, setActionCards] = useState([
    actions
      ? actions.map((_) => ({ id: Date.now().toString() }))
      : { id: Date.now().toString() },
  ]);

  const addActionCard = () => {
    const newCard = { id: Date.now().toString() };
    setActionCards([...actionCards, newCard]);
  };

  const deleteActionCard = (id) => {
    if (actionCards.length > 1) {
      setActionCards((prevCards) => prevCards.filter((card) => card.id !== id));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>THEN</Text>
        <TouchableOpacity onPress={addActionCard}>
          <AntDesignIcon
            name={"plus"}
            size={20}
            color={colors.primary}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {actionCards.map((card, index) => (
        <NewActionCard
          index={index}
          key={index}
          card={card}
          action={actions ? actions[index] : null}
          handleDelete={() => deleteActionCard(card.id)}
          deleteDisabled={actionCards.length == 1}
        />
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
  },
});
