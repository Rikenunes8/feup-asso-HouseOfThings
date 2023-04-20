import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

import Row from "../grid/Row";
import Col from "../grid/Column";
import colors from "../../../configs/colors";

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
      [weekday]: !weekdays[weekday],
    }));
    const weekdaysSelected = Object.keys(weekdays).filter(
      (key) => weekdays[key]
    );
    updateWeekdays(weekdaysSelected);
  };

  return (
    <Row>
      {Object.keys(weekdays).map((weekday) => (
        <Col>
          <Pressable
            activeOpacity={0.6}
            onPress={() => handleWeekDaySelected(weekday)}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? colors.transparentPrimary
                  : colors.transparent,
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
  },
  daySelected: {
    backgroundColor: colors.primary,
  },
});
