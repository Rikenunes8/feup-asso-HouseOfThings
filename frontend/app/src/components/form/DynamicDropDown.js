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
  isSearchable = false,
  dividedByCategories = false,
  margin = 15,
  onSelectItem = () => {},
}) {
  const [open, setOpen] = React.useState(false);

  const customMargin = {
    margin: margin,
  };

  return (
    <View style={[customMargin, styles.container]}>
      {label == "" ? null : <Text style={styles.field}>{label}</Text>}

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
        listParentLabelStyle={dividedByCategories ? styles.parent : null}
        categorySelectable={!dividedByCategories}
        searchable={isSearchable}
        onSelectItem={onSelectItem}
        closeAfterSelecting={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //margin: 15
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
  parent: {
    fontWeight: "bold",
  },
});
