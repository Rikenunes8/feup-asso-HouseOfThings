import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import colors from "../../configs/colors";

export default function ContextMenu({
  isContextMenuVisible,
  options,
  position,
  backgroundColor,
}) {
  return (
    <View
      style={
        styles(isContextMenuVisible, false, position, backgroundColor).menu
      }
    >
      {options.map((option) => (
        <TouchableOpacity
          key={option.name}
          style={styles().menuOption}
          onPress={option.callback}
        >
          {option.icon != null ? (
            <Icon name={option.icon} size={20} color={option.color} />
          ) : null}
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

const styles = (
  isContextMenuVisible = false,
  optionColor = false,
  position = [55, 25],
  backgroundColor = colors.white
) =>
  StyleSheet.create({
    menu: {
      display: isContextMenuVisible ? "flex" : "none",
      position: "absolute",
      top: position[0],
      right: position[1],
      paddingEnd: 10,
      borderRadius: 10,
      backgroundColor: backgroundColor,
      zIndex: 1,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.1,
      shadowRadius: 3.5,
      elevation: 5,
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
