import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import NewActionCard from "./NewActionCard";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

import colors from "../../../../configs/colors";

export default function ActionForm() {
  const [numActionsCards, setNumActionsCards] = useState(1);

  const addActionCard = () => {
    setNumActionsCards(numActionsCards + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>THEN</Text>
        <AntDesignIcon
          name={"plus"}
          size={20}
          color={colors.primary}
          style={styles.plus_icon}
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
  },
});
