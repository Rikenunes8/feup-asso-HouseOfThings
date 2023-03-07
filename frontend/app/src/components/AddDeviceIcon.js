import React from "react";
import { Image } from "react-native";
import colors from "../../configs/colors";

export default function AddDeviceIcon({ focused }) {
  return (
    <Image
      source={require("../../../assets/plus_icon.png")}
      resizeMode="contain"
      style={{
        width: 30,
        height: 30,
        tintColor: colors.white,
      }}
      focused={focused}
    />
  );
}
