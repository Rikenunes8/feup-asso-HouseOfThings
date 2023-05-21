import { StyleSheet, View } from "react-native";
import React, { useState, useContext } from "react";
import RangeSlider from "../../../form/RangeSlider";
import CreateRuleContext from "../../../../contexts/CreateRuleContext";

export default function TemperatureCondition({
  index,
  current_value /*TODO*/,
}) {
  const { addRuleConditionState } = useContext(CreateRuleContext);

  const [valueOnRange, setValuesOnRange] = useState([10, 30]);

  const handleSliderChange = (newValues) => {
    setValuesOnRange(newValues);
    addRuleConditionState(index, "temperature", newValues, ">"); //TODO
  };

  return (
    <View style={styles.center}>
      <RangeSlider
        values={valueOnRange}
        setValue={handleSliderChange}
        name={"Temperature"}
      ></RangeSlider>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
