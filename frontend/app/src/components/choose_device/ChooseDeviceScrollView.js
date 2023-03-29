import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import ChooseDeviceCard from "./ChooseDeviceCard";

export default function ChooseDeviceScrollView({ subcategories }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.gridView}>
        {subcategories.map((subcategory) => (
          <ChooseDeviceCard key={subcategory} subcategory={subcategory} />
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
