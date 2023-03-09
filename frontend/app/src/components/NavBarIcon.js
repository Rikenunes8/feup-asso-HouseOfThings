import React from "react";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import colors from "../../configs/colors";

export default function NavBarIcon({ name, focused }) {
  return (
    <Icon
      name={name}
      size={30}
      color={focused ? colors.primary : colors.primaryText}
      style={{ alignItems: "center", justifyContent: "center", top: 10 }}
    />
  );
}
