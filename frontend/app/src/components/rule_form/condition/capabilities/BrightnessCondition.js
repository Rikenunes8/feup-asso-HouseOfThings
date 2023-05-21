import { StyleSheet, View } from "react-native";
import React, { useState, useContext } from "react";
import RangeSlider from "../../../form/RangeSlider";
import CreateRuleContext from "../../../../contexts/CreateRuleContext";

export default function BrightnessCondition({ index, current_value /*TODO*/ }) {
  const { addRuleConditionState } = useContext(CreateRuleContext);

  const [valueOnRange, setValuesOnRange] = useState([50, 80]);

  const handleSliderChange = (newValues) => {
    setValuesOnRange(newValues);
    addRuleConditionState(index, "brightness", newValues, ">"); //TODO
  };

  return (
    <View style={styles.center}>
      <RangeSlider
        values={valueOnRange}
        setValue={handleSliderChange}
        name={"Brightness"}
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
