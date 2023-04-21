import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "../../../configs/colors";

const DynamicDropDown = ({
  label = "",
  items,
  value,
  setValue,
  onChange,
  disable = false,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    return <Text style={styles.label}>{label}</Text>;
  };

  const onSelectItem = (item) => {
    setValue(item.value);
    setIsFocus(false);
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={items}
        disable={disable}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={""}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={onChange} /* TODO
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? 'blue' : 'black'}
            name="Safety"
            size={20}
          />
        )}*/
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
    padding: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    zIndex: 999,

    fontSize: 14,
    color: colors.primary,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
