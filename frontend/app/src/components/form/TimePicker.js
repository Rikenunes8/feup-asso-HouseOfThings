import React, { useState } from "react";
import { StyleSheet, Text, Dimensions } from "react-native";

import Row from "../grid/Row";
import Col from "../grid/Column";
import DynamicDropDown from "./DynamicDropDown";

import colors from "../../../configs/colors";

export default function TimePicker({ time = "00:00", setTime }) {
  const [hour, setHour] = useState(time.split(":")[0]);
  const [minute, setMinute] = useState(time.split(":")[1]);

  const [hours, setHours] = useState(
    Array.from({ length: 24 }, (_, i) => ({
      label: `${i + 1}`.padStart(2, "0"),
      value: `${i + 1}`.padStart(2, "0"),
    }))
  );

  const [minutes, setMinutes] = useState(
    Array.from({ length: 60 }, (_, i) => ({
      label: `${i + 1}`.padStart(2, "0"),
      value: `${i + 1}`.padStart(2, "0"),
    }))
  );

  const updateHour = (item) => {
    const updated_hour = `${item.value}:${minute}`;
    setTime(updated_hour);
    setHour(item);
  };

  const updateMinutes = (item) => {
    const updated_minutes = `${hour}:${item.value}`;
    setTime(updated_minutes);
    setMinute(item);
  };

  const modalProps = {
    transparent: true,
    presentationStyle: "overFullScreen",
  };

  return (
    <Row>
      <Col numRows={1}>
        <DynamicDropDown
          items={hours}
          setItems={setHours}
          value={hour}
          setValue={setHour}
          listMode={"MODAL"}
          modalProps={modalProps}
          modalContentContainerStyle={styles.modalContent}
          onSelectItem={updateHour}
          key="hour-dropdown"
        />
      </Col>
      <Text style={styles.text}>H</Text>

      <Col numRows={1}>
        <DynamicDropDown
          items={minutes}
          setItems={setMinutes}
          value={minute}
          setValue={setMinute}
          listMode={"MODAL"}
          modalProps={modalProps}
          modalContentContainerStyle={styles.modalContent}
          onSelectItem={updateMinutes}
          key="minute-dropdown"
        />
      </Col>
      <Text style={styles.text}>M</Text>
    </Row>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "left",
    marginRight: 15,
    fontSize: 15,
  },
  modalContent: {
    backgroundColor: colors.white,
    paddingHorizontal: 28,
    marginHorizontal: 0,
    paddingBottom: 25,
    marginTop:
      67 +
      Dimensions.get("window").height *
        (Platform.OS === "android" ? 0.15 : 0.3),
    borderRadius: 30,
  },
});
