import React, { useState, useContext } from "react";
import { StyleSheet, Text } from "react-native";

import Row from "../grid/Row";

import WeekDayPicker from "./WeekDayPicker";
import TimePicker from "./TimePicker";
import CreateRuleContext from "../../contexts/CreateRuleContext";

export default function ScheduleForm(props) {
  const { updateCondition } = useContext(CreateRuleContext);
  
  const [time, setTime] = useState(null);

  const updateTime = (item) => {
    setTime(item);
    updateCondition(props.index, "time", item);
  };

  const updateWeekDays = (item) => {
    updateCondition(props.index, "days", item);
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
