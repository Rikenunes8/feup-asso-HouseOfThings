import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import WeekDayPicker from "../form/WeekDayPicker";
import TimePicker from "../form/TimePicker";

import CreateRuleContext from "../../contexts/CreateRuleContext";

export default function ScheduleForm(props) {
  const { updateRuleCondition } = useContext(CreateRuleContext);

  const [time, setTime] = useState("00:00");

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
        <WeekDayPicker updateWeekdays={updateWeekDays}></WeekDayPicker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  weekDays: {
    paddingVertical: 15,
  },
});
