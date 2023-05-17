import React from "react";
import { StyleSheet, View, Text } from "react-native";

import Row from "../../grid/Row";
import colors from "../../../../configs/colors";

export default function ScheduleCondition({ time, daysOfWeek }) {
  weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  console.log("ScheduleCondition: daysOfWeek: ", daysOfWeek);

  return (
    <View>
      <Text style={styles.time}>Time: {time}</Text>
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
  time: {
    marginBottom: 10,
    fontWeight: "bold",
    color: colors.primaryText,
  },
  day: {
    backgroundColor: colors.transparentPrimary,
    borderRadius: 5,
    padding: 5,
    margin: 3,
  },
  daysOfWeek: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "flex-start",
  },
});
