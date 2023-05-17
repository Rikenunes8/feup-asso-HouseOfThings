import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import NewActionCard from "./NewActionCard";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

import colors from "../../../../configs/colors";

export default function ActionForm() {
  const [actionCards, setActionCards] = useState([
    { id: Date.now().toString() },
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
          key={card.id}
          card={card}
          handleDelete={() => deleteActionCard(card.id)}
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
