import React from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../../../../configs/colors";

export default function ScheduleCondition({ time, daysOfWeek }) {
  weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{time}</Text>
      <View style={styles.daysOfWeek}>
        {daysOfWeek.map((day) => (
          <View key={day} style={styles.day}>
            <Text>{weekDays[day]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    flexWrap: "wrap",
    gap: 10,
  },
  time: {
    fontWeight: "bold",
    color: colors.primaryText,
  },
  day: {
    backgroundColor: colors.transparentPrimary,
    borderRadius: 5,
    padding: 5,
    marginVertical: 3,
    marginHorizontal: 3,
  },
  daysOfWeek: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
});
