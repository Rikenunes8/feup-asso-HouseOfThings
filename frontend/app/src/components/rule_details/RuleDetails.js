import React, { useContext } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import colors from "../../../configs/colors";

import ScheduleCondition from "./condition/ScheduleCondition";
import DeviceCondition from "./condition/DeviceCondition";
import DevicesContext from "../../contexts/DevicesContext";
import DeviceAction from "./action/DeviceAction";
import MessageAction from "./action/MessageAction";

export default function RuleDetails({ rule }) {
  const { devices } = useContext(DevicesContext);

  // TODO: remove when it comes in this format from backend
  rule.then = [
    {
      kind: "device",
      device_id: "1",
      action: "turn_on",
    },
    {
      kind: "device",
      device_id: "1",
      action: "set_color",
      data: {
        color: "#FF0000",
      },
    },
    {
      kind: "device",
      device_id: "1",
      action: "set_brightness",
      data: {
        brightness: "50",
      },
    },
    {
      kind: "message",
      service: "discord",
      data: {
        url: "https://discord.com/api/webhooks/1108084159903178892/-wfJopfOfAmXNI-XYh2sZA20Q1CxMmgOYN9eEu0EoRJ69TatLzWaVoh89_mqunzP8RG6",
      },
    },
    {
      kind: "message",
      service: "whatsapp",
      data: {
        number: "987654321",
      },
    },
  ];

  rule.when = [
    {
      kind: "device",
      device_id: "1",
      comparator: "==",
      attribute: "power",
      state: true,
    },
    {
      kind: "device",
      device_id: "1",
      comparator: "<", // [==, <, >]
      attribute: "brightness",
      state: 50,
    },
    {
      kind: "schedule",
      time: "10:30",
      days: [1, 3, 5],
    },
  ];

  const whenByDevice = {};
  rule.when.forEach((item) => {
    if (item.kind === "device") {
      const deviceId = item.device_id;
      if (!whenByDevice[deviceId]) {
        whenByDevice[deviceId] = [];
      }
      whenByDevice[deviceId].push({
        comparator: item.comparator,
        attribute: item.attribute,
        state: item.state,
      });
    }
  });

  const thenByDevice = {};
  rule.then.forEach((item) => {
    if (item.kind === "device") {
      const deviceId = item.device_id;
      if (!thenByDevice[deviceId]) {
        thenByDevice[deviceId] = [];
      }
      thenByDevice[deviceId].push({ [item.action]: item.data });
    }
  });

  const whenBySchedule = rule.when.filter((item) => item.kind === "schedule");
  const thenByMessage = rule.then.filter((item) => item.kind === "message");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.condition_container}>
        <View style={styles.header}>
          <Text style={styles.title}>WHEN</Text>
          <Text style={styles.operation}>{rule.operation.toUpperCase()}</Text>
        </View>

        {Object.keys(whenByDevice).map((deviceId) => (
          <View style={styles.card} key={deviceId}>
            <DeviceCondition
              device={devices.find((device) => device.uid == deviceId)}
              data={whenByDevice[deviceId]}
            />
          </View>
        ))}

        {whenBySchedule.map((item) => (
          <View style={styles.card} key={item.time}>
            <ScheduleCondition time={item.time} daysOfWeek={item.days} />
          </View>
        ))}
      </View>

      <View style={styles.action_container}>
        <View style={styles.header}>
          <Text style={styles.title}>THEN</Text>
        </View>

        {Object.keys(thenByDevice).map((deviceId) => (
          <View style={styles.card} key={deviceId}>
            <DeviceAction
              device={devices.find((device) => device.uid == deviceId)}
              actions={thenByDevice[deviceId]}
            />
          </View>
        ))}

        {thenByMessage.map((item) => (
          <View style={styles.card} key={item.service}>
            <MessageAction service={item.service} data={item.data} />
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
  action_container: {
    margin: 20,
    width: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: colors.white,
    zIndex: 1,
  },
  title: {
    fontSize: 15,
    color: colors.primary,
  },
  operation: {
    alignSelf: "flex-end",
    fontSize: 12,
    color: colors.primary,
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
