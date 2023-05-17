import React, { useContext } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import colors from "../../../configs/colors";

import ActionForm from "../rule_form/action/ActionForm";
import ScheduleCondition from "./condition/ScheduleCondition";
import DeviceCondition from "./condition/DeviceCondition";
import DevicesContext from "../../contexts/DevicesContext";
import RuleAction from "./RuleAction";

export default function RuleDetails({ rule }) {
  const { devices } = useContext(DevicesContext);
  console.log("RuleDetails: rule: ", rule.then);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.condition_container}>
        <View style={styles.header}>
          <Text style={styles.title}>WHEN</Text>
        </View>

        {[...Array(rule.when.length)].map((_, index) => (
          <View style={styles.card} key={index}>
            {rule.when[index].kind === "device" ? (
              <DeviceCondition
                device={devices.find(
                  (device) => device.uid == rule.when[index].device_id
                )}
                state={rule.when[index].state}
              />
            ) : (
              <ScheduleCondition
                time={rule.when[index].time}
                daysOfWeek={rule.when[index].days}
              />
            )}
          </View>
        ))}
      </View>

      <View style={styles.condition_container}>
        <View style={styles.header}>
          <Text style={styles.title}>THEN</Text>
        </View>

        {[...Array(rule.then.length)].map((_, index) => (
          <View style={styles.card} key={index}>
              <RuleAction
                device={devices.find(
                  (device) => device.uid == rule.then[index].device_id
                )}
                action={rule.then[index].action}
              />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  condition_container: {
    margin: 20,
    width: "90%",
  },
  header: {
    flexDirection: "row",
    zIndex: 1,
  },
  title: {
    flexGrow: 1,
    fontSize: 15,
    color: colors.primary,
  },
  icon: {
    flexGrow: 0,
    marginRight: 5,
  },
  card: {
    backgroundColor: colors.white,
    alignItems: "flex-start",
    alignContent: "center",
    borderRadius: 5,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    padding: 15,
    marginVertical: 10,
    paddingHorizontal: 20,
    zIndex: 0,
  },
});
