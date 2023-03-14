import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import colors from "../../configs/colors";

export default function ContextMenu({ isContextMenuVisible, options }) {
  return (
    <View style={styles(isContextMenuVisible).menu}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.name}
          style={styles().menuOption}
          onPress={option.callback}
        >
          <Icon name={option.icon} size={20} color={option.color} />
          <Text
            style={styles(isContextMenuVisible, option.color).menuOptionText}
          >
            {option.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = (isContextMenuVisible = false, optionColor = false) =>
  StyleSheet.create({
    menu: {
      display: isContextMenuVisible ? "flex" : "none",
      position: "absolute",
      top: 55,
      right: 25,
      paddingEnd: 10,
      borderRadius: 10,
      backgroundColor: colors.white,
    },
    menuOption: {
      flexDirection: "row",
      justifyContent: "flex-start",
      paddingVertical: 7,
      paddingHorizontal: 10,
    },
    menuOptionText: {
      fontSize: 17,
      marginLeft: 10,
      color: optionColor,
    },
  });
