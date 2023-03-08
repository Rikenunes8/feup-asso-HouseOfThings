import React from "react";
import { View, ScrollView } from "react-native";
import ChooseDeviceCard from "./ChooseDeviceCard";

export default function ChooseDeviceScrollView({ deviceTypes }) {
  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: "row",
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {deviceTypes.map((type) => (
          <ChooseDeviceCard key={type} type={type} />
        ))}
      </View>
    </ScrollView>
  );
}
