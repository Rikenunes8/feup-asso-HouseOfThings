import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import WeekDayPicker from "../form/WeekDayPicker";
import TimePicker from "../form/TimePicker";

import CreateRuleContext from "../../contexts/CreateRuleContext";

export default function ScheduleForm(props) {
  const { updateRuleCondition } = useContext(CreateRuleContext);

  const [time, setTime] = useState(
    props.condition ? props.condition.time : "00:00"
  );

  const [weekDays] = useState(
    props.condition && props.condition.days
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

  useEffect(() => {
    updateRuleCondition(props.index, "time", time);
    updateRuleCondition(props.index, "days", []);
  }, []);

  return (
    <View>
      <TimePicker time={time} setTime={updateTime}></TimePicker>
      <View style={styles.weekDays}>
        <WeekDayPicker weekDays={weekDays} updateWeekdays={updateWeekDays} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  weekDays: {
    paddingVertical: 15,
  },
});
