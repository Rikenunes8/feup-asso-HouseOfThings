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
  modalProps = {},
  modalAnimationType = "fade",
  modalContentContainerStyle = {},
  onSelectItem = () => {},
  hasCategory = false,
}) {
  const [open, setOpen] = React.useState(false);
  const hasLabel = label !== undefined && label !== "";

  return (
    <View style={styles(hasLabel).container}>
      {hasLabel && <Text style={styles().field}>{label}</Text>}

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
        closeIconStyle={styles().closeIcon}
        iconContainerStyle={styles().iconContainer}
        disabled={disabled}
        showArrowIcon={showArrowIcon}
        listMode={listMode}
        modalTitle={hasLabel ? label : "OPTIONS"}
        modalTitleStyle={styles().modalTitle}
        modalProps={modalProps}
        modalAnimationType={modalAnimationType}
        modalContentContainerStyle={modalContentContainerStyle}
        onSelectItem={onSelectItem}
        categorySelectable={!hasCategory}
        listParentLabelStyle={hasCategory ? styles().parent : null}
      />
    </View>
  );
}

const styles = (label = true) =>
  StyleSheet.create({
    container: {
      margin: 15,
      marginTop: label ? 15 : 7,
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
    closeIcon: {
      height: 20,
      width: 20,
      marginTop: 10,
      marginBottom: 5,
    },
    iconContainer: {
      width: 25,
      alignItems: "center",
    },
    field: {
      color: colors.primary,
    },
    modalTitle: {
      color: colors.primary,
      fontSize: 14,
      marginTop: 10,
      marginBottom: 5,
    },
    parent: {
      fontWeight: "bold",
      color: colors.primary,
    },
  });
