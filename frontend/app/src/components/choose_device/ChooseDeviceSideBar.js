import React, { useContext, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import colors from "../../../configs/colors";
import AddDeviceContext from "../../contexts/AddDeviceContext";

export default function ChooseDeviceSideBar({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  const { setDeviceCategory } = useContext(AddDeviceContext);

  useEffect(() => {
    setDeviceCategory(selectedCategory.name);
  }, []);

  return (
    <View style={styles().modalSideBar}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            setSelectedCategory(category);
            setDeviceCategory(category);
          }}
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
