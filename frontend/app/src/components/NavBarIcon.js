import React from "react";
import { Image } from "react-native";
import colors from "../../configs/colors";

export default function NavBarIcon({ image, focused }) {
  return (
    <Image
      source={image}
      resizeMode="contain"
      style={{
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        top: 10,
        tintColor: focused ? colors.primary : colors.primaryText,
      }}
    />
  );
}
