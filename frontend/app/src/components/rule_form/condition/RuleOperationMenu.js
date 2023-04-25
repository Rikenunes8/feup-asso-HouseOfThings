import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import colors from "../../../../configs/colors";

export default function RuleOperationMenu({ isContextMenuVisible, options, callback }) {

    return (
    <View style={styles(isContextMenuVisible).menu}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={styles().menuOption}
          onPress={() => callback(option)}
        >
          <Text
            style={styles(isContextMenuVisible).menuOptionText}
          >
     
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = (isContextMenuVisible = false) =>
  StyleSheet.create({
    menu: {
      display: isContextMenuVisible ? "flex" : "none",
      position: "absolute",
      top: 10,
      right: 30,
      paddingEnd: 10,
      borderRadius: 10,
      backgroundColor: colors.background,
 
    },
    menuOption: {
      flexDirection: "row",
      justifyContent: "flex-start",
      paddingVertical: 7,
      paddingHorizontal: 10,
    },
    menuOptionText: {
      marginLeft: 10,
      width: '100%',
    },
  });
