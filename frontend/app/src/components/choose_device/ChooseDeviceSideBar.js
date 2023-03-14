import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import colors from "../../../configs/colors";

export default function ChooseDeviceSideBar({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <View style={styles().modalSideBar}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          disabled={category.name !== "light"} // TODO: only for vertical prototype, remove when we have more devices
          onPress={() => setSelectedCategory(category)}
        >
          <Text style={styles(category === selectedCategory).categoryTitle}>
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = (isSelected = false) =>
  StyleSheet.create({
    categoryTitle: {
      fontSize: 17,
      paddingVertical: 7,
      textTransform: "capitalize",
      color: colors.secondaryText,
      ...(isSelected
        ? {
            color: colors.primary,
            borderRightWidth: 4,
            borderRightColor: colors.primary,
          }
        : null),
    },
    modalSideBar: {
      flex: 0.35,
      flexDirection: "column",
      paddingLeft: 20,
      borderColor: colors.secondaryText,
      borderRightWidth: 1,
    },
  });
