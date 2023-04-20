import React, { useState } from "react";
import { Switch, StyleSheet } from "react-native";
import RangeSlider from "../../form/RangeSlider";

import colors from "../../../../configs/colors";

export default function FeatureForm({ feat, ruleCondition, setRuleCondition }) {
  const [state, setState] = useState(false);

  const updateState = (item, field) => {
    value = field == "status" ? (item ? "turnon" : "turnoff") : item;

    setRuleCondition((prevJson) => ({
      ...prevJson,
      state: {
        [field]: value,
      },
    }));

    setState(!state);
  };

  switch (feat) {
    case "status":
      return (
        <Switch
          trackColor={{ false: colors.desactive, true: colors.active }}
          thumbColor={colors.white}
          onValueChange={(e) => updateState(e, "status")}
          value={state}
          style={styles.switch}
        />
      );
    case "slider":
      return (
        <RangeSlider setValue={updateState} name={"brightness"}></RangeSlider>
      );
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  switch: { marginRight: 15 },
});
