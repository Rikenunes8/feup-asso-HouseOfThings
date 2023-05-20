import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

import Row from "../grid/Row";
import Col from "../grid/Column";
import colors from "../../../configs/colors";

const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function WeekDayPicker({ updateWeekdays }) {
  const [weekdays, setWeekdays] = useState({
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
    Sat: false,
    Sun: false,
  });

  const handleWeekDaySelected = (weekday) => {
    setWeekdays((prevState) => ({
      ...prevState,
      [weekday]: !prevState[weekday],
    }));
    const weekdaysSelected = weekdayLabels.filter((key) => (weekdays[key]));
    const indexes = weekdaysSelected.map((day) => weekdayLabels.indexOf(day));
    updateWeekdays(indexes);
  };

  return (
    <Row>
      {weekdayLabels.map((weekday) => (
        <Col key={weekday}>
          <Pressable
            activeOpacity={0.6}
            onPress={() => handleWeekDaySelected(weekday)}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? colors.transparent
                  : colors.transparentPrimary,
              },
            ]}
          >
            <View
              style={
                weekdays[weekday]
                  ? [styles.daySelected, styles.day]
                  : styles.day
              }
            >
              <Text
                style={
                  weekdays[weekday]
                    ? { color: colors.white }
                    : { color: colors.black }
                }
              >
                {weekday}
              </Text>
            </View>
          </Pressable>
        </Col>
      ))}
    </Row>
  );
}

const styles = StyleSheet.create({
  day: {
    alignItems: "center",
    padding: 8,
    borderRadius: 5,
    zIndex: 0,
  },
  daySelected: {
    backgroundColor: colors.primary,
  },
});
