import React from "react";
import { StyleSheet, View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import colors from "../../../configs/colors";

export default function DynamicDropDown({
  label,
  items,
  setItems,
  value,
  setValue,
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <View style={styles().container}>
      <Text style={styles().field}>{label}</Text>

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder=""
        dropDownContainerStyle={styles().dropdown}
        style={styles().selector}
      />
    </View>
  );
}

const styles = (on = false) =>
  StyleSheet.create({
    container: {
      margin: 20,
    },
    dropdown: {
      backgroundColor: colors.background,
    },
    selector: {
      borderColor: colors.white,
      borderBottomColor: colors.black,
      borderRadius: 0,
      backgroundColor: colors.transparent,
    },
    field: {
      color: colors.primary,
    },
  });
