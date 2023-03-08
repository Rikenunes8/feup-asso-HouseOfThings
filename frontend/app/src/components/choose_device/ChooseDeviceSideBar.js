import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import colors from "../../../configs/colors";

export default function ChooseDeviceSideBar({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <View style={styles.modalSideBar}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          onPress={() => setSelectedCategory(category)}
        >
          <Text
            style={[
              styles.categoryTitle,
              category === selectedCategory
                ? {
                    color: colors.primary,
                    borderRightWidth: 4,
                    borderRightColor: colors.primary,
                  }
                : null,
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  categoryTitle: {
    fontSize: 17,
    paddingVertical: 7,
    color: colors.secondaryText,
  },
  modalSideBar: {
    flex: 0.35,
    flexDirection: "column",
    paddingLeft: 20,
    borderColor: colors.secondaryText,
    borderRightWidth: 1,
  },
});
