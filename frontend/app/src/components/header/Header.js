import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";

import UsernameContext from "../../contexts/UsernameContext";

import colors from "../../../configs/colors";

export default function Header() {
  const navigation = useNavigation();

  const { username } = useContext(UsernameContext);

  return (
    <View style={styles.header}>
      <TouchableOpacity
        // on press should open the profile screen
        onPress={() => navigation.navigate("Profile")}
        style={styles.icon}
      >
        <Icon name={"user"} size={20} color={colors.primaryText} />
      </TouchableOpacity>
      <Text style={styles.message}>Hello, {username.trim()}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flex: 0.15,
    backgroundColor: colors.primary,
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  icon: {
    padding: 12,
    borderRadius: 24,
    alignSelf: "flex-end",
    backgroundColor: colors.white,
  },
  message: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "bold",
    marginStart: 15,
  },
});
