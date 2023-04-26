import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";

import Col from "../grid/Column";
import DynamicDropDown from "./DynamicDropDown";

export default function TimePicker({ time = "00:00", setTime }) {
  const [hour, setHour] = useState(time.split(":")[0]);
  const [minute, setMinute] = useState(time.split(":")[1]);

  const hours = Array.from({ length: 24 }, (_, i) => ({
    label: `${i + 1}`.padStart(2, "0"),
    value: `${i + 1}`.padStart(2, "0"),
  }));

  const minutes = Array.from({ length: 60 }, (_, i) => ({
    label: `${i + 1}`.padStart(2, "0"),
    value: `${i + 1}`.padStart(2, "0"),
  }));

  const updateHour = (item) => {
    const updated_hour = `${item.value}:${minute.value}`;
    setTime(updated_hour);
    setHour(item);
  };

  const updateMinutes = (item) => {
    const updated_minutes = `${hour.value}:${item.value}`;
    setTime(updated_minutes);
    setMinute(item);
  };

  return (
    <>
      <Col numRows={1}>
        <DynamicDropDown
          items={hours}
          value={hour}
          setValue={setHour}
          onChange={updateHour}
          key="hour-dropdown"
        />
      </Col>
      <Col>
        <Text style={styles.text}>H</Text>
      </Col>

      <Col numRows={1}>
        <DynamicDropDown
          items={minutes}
          value={minute}
          setValue={setMinute}
          onChange={updateMinutes}
          key="minute-dropdown"
        />
      </Col>
      <Col>
        <Text style={styles.text}>M</Text>
      </Col>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginHorizontal: 10,
    fontSize: 15,
  },
});
