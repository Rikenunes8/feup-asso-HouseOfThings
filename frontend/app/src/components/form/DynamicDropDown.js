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
  disabled = false,
  showArrowIcon = true,
  listMode = "DEFAULT",
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.field}>{label}</Text>

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder=""
        dropDownContainerStyle={styles.dropdown}
        style={styles.selector}
        disabled={disabled}
        showArrowIcon={showArrowIcon}
        listMode={listMode}
        modalTitle={label}
        modalTitleStyle={{ color: colors.primary, fontSize: 14 }}
        modalContentContainerStyle={{
          backgroundColor: colors.background,
          width: "65%",
          alignSelf: "center",
          marginTop: 300,
          marginBottom: 100,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    zIndex: 10,
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
