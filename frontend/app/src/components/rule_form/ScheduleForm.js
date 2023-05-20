import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";

import Row from "../grid/Row";
import WeekDayPicker from "../form/WeekDayPicker";
import TimePicker from "../form/TimePicker";

import CreateRuleContext from "../../contexts/CreateRuleContext";

export default function ScheduleForm(props) {
  const { updateRuleCondition } = useContext(CreateRuleContext);

  const [time, setTime] = useState(
    props.condition ? props.condition.time : "00:00"
  );

  const [weekDays] = useState(
    props.condition
      ? {
          Mon: props.condition.days.includes(0),
          Tue: props.condition.days.includes(1),
          Wed: props.condition.days.includes(2),
          Thu: props.condition.days.includes(3),
          Fri: props.condition.days.includes(4),
          Sat: props.condition.days.includes(5),
          Sun: props.condition.days.includes(6),
        }
      : null
  );

  const updateTime = (item) => {
    setTime(item);
    updateRuleCondition(props.index, "time", item);
  };

  const updateWeekDays = (item) => {
    updateRuleCondition(props.index, "days", item);
  };

  return (
    <View style={styles.container}>
      <Row>
        <TimePicker time={time} setTime={updateTime}></TimePicker>
      </Row>
      <View style={styles.weekDays}>
        <WeekDayPicker
          weekDays={weekDays}
          updateWeekdays={updateWeekDays}
        ></WeekDayPicker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
  },
  weekDays: {
    paddingTop: 10,
  },
});
