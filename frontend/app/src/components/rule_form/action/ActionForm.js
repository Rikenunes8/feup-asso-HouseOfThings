import React from "react";
import { StyleSheet, Text, View } from "react-native";

import AntDesignIcon from "react-native-vector-icons/AntDesign";

import colors from "../../../../configs/colors";

export default function ActionForm() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>THEN</Text>
        <AntDesignIcon
          name={"plus"}
          size={20}
          color={colors.primary}
          style={styles.setting_icon}
        />
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
