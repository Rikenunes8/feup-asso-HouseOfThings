import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";
import colors from "../../configs/colors";

export default function ChooseDeviceCard({ type }) {
  return (
    <TouchableOpacity
      key={type}
      style={{
        alignItems: "center",
        justifyContent: "space-around",
        width: "45%",
        height: 120,
        paddingHorizontal: "5%",
        marginVertical: "8%",
      }}
    >
      <Image
        style={[{ width: 80, height: 80, objectFit: "contain" }]}
        source={require("../../../assets/lightbulb.png")}
      />
      <Text
        style={{
          color: colors.primaryText,
          fontSize: 15,
          marginBottom: "5%",
        }}
      >
        {type}
      </Text>
    </TouchableOpacity>
  );
}
