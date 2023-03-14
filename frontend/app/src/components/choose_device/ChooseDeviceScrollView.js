import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import ChooseDeviceCard from "./ChooseDeviceCard";

export default function ChooseDeviceScrollView({ deviceTypes }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.gridView}>
        {deviceTypes.map((type) => (
          <ChooseDeviceCard key={type} type={type} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // TODO: change edge effect color of scroll view (?)
  scrollView: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  gridView: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
