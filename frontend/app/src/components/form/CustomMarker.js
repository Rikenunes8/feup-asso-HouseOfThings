import React from "react";
import { View } from "react-native";
import colors from "../../../configs/colors";

export default function CustomMarker() {
  return (
    <View
      style={{
        backgroundColor: colors.primary,
        height: CustomMarker.size,
        width: CustomMarker.size,
        borderRadius: CustomMarker.size / 2,
      }}
    />
  );
}
CustomMarker.size = 15;
