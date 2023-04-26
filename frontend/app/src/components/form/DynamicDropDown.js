import React, { useState } from "react";

import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import colors from "../../../configs/colors";

const DynamicDropDown = ({
  label = "",
  items,
  value,
  setValue,
  onChange = (item) => {setValue(item.value)},
  disable = false,
}) => {

  const renderLabel = () => {
    return <Text style={styles.label}>{label}</Text>;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={items}
        disable={disable}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={""}
        searchPlaceholder="Search..."
        value={value}
        onChange={onChange}
      />
    </View>
  );
};

export default DynamicDropDown;

const styles = StyleSheet.create({
  container: {
    width: "90%",
  },
  dropdown: {
    borderColor: colors.black,
    borderBottomWidth: 1,
    padding: 3,
  },
  label: {
    fontSize: 14,
    color: colors.primary,
  },
});
