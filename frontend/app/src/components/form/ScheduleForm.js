import React, { useState, useContext } from "react";
import { StyleSheet } from "react-native";

import Row from "../grid/Row";

import WeekDayPicker from "./WeekDayPicker";
import TimePicker from "./TimePicker";

export default function ScheduleForm({ ruleCondition, setRuleCondition }) {
  const [time, setTime] = useState(null);

  const updateTime = (item) => {
    setTime(item);
    setRuleCondition((prevJson) => ({
      ...prevJson,
      time: item,
    }));
  };

  const updateWeekDays = (item) => {
    setRuleCondition((prevJson) => ({
      ...prevJson,
      days: item,
    }));
  };

  return (
    <>
      <Row>
        <TimePicker time={time} setTime={updateTime}></TimePicker>
      </Row>
      <Row>
        <WeekDayPicker updateWeekdays={updateWeekDays}></WeekDayPicker>
      </Row>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    margin: 2,
  },
});
