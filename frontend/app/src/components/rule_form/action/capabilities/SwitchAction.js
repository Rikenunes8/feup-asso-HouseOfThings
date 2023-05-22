import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Switch } from "react-native";
import colors from "../../../../../configs/colors";
import CreateRuleContext from "../../../../contexts/CreateRuleContext";

export default function SwitchAction({ index, action }) {
  const { updateRuleAction } = useContext(CreateRuleContext);

  const [state, setState] = useState(action ?? false);

  const handleStatusChange = (item) => {
    setState(item);
    updateRuleAction(index, item ? "turn_on" : "turn_off", null);
  };

  useEffect(() => {
    updateRuleAction(index, state ? "turn_on" : "turn_off", null);
  }, []);

  return (
    <View style={styles.center}>
      <Switch
        trackColor={{ false: colors.desactive, true: colors.active }}
        thumbColor={colors.white}
        onValueChange={handleStatusChange}
        value={state}
        style={styles.switch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  switch: { marginRight: 15 },
  center: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
