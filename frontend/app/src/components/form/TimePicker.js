import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";

import Col from "../grid/Column";
import DynamicDropDown from "./DynamicDropDown";

export default function TimePicker({ time, setTime }) {
  const [hour, setHour] = useState(null);
  const [minute, setMinute] = useState(null);

  const [hours, setHours] = useState(
    Array.from({ length: 24 }, (_, i) => `${i + 1}`.padStart(2, "0")).map(
      (item) => {
        return { label: item, value: item };
      }
    )
  );

  const [minutes, setMinutes] = useState(
    Array.from({ length: 60 }, (_, i) => `${i + 1}`.padStart(2, "0")).map(
      (item) => {
        return { label: item, value: item };
      }
    )
  );

  const updateHour = (item) => {
    if (time != null) {
      str_splitted = time.split(":");
      current_hour = str_splitted[0];
      current_minutes = str_splitted[1];

      updated_hour = item.value + ":" + current_minutes;
      setTime(updated_hour);
    } else {
      updated_hour = item.value + ":00";
      setTime(updated_hour);
    }
  };

  const updateMinutes = (item) => {
    if (time != null) {
      str_splitted = time.split(":");
      current_hour = str_splitted[0];
      current_minutes = str_splitted[1];

      updated_minutes = current_hour + ":" + item.value;
      setTime(updated_minutes);
    } else {
      updated_hour = "00:" + item.value;
      setTime(updated_hour);
    }
  };

  return (
    <>
      <Col numRows={1}>
        <DynamicDropDown
          items={hours}
          value={hour}
          setValue={setHour}
          onChange={(item) => updateHour(item)}
        ></DynamicDropDown>
      </Col>
      <Col>
        <Text style={styles.text}>H</Text>
      </Col>
    
      <Col numRows={1}>
        <DynamicDropDown
          items={minutes}
          value={minute}
          setValue={setMinute}
          onChange={(item) => updateMinutes(item)}
        ></DynamicDropDown>
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
