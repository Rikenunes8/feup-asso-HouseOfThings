import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";

import Header from "../components/header/Header";

import colors from "../../configs/colors";
import Badge from "../components/Badge";

import moment from "moment";

const data = [
  {
    id: "1",
    content: "Added a new device",
    type: "error",
    time: "2023-05-18T07:30:00",
  },
  {
    id: "2",
    content: "Added a new device",
    type: "info",
    time: "2023-05-18T10:30:00",
  },
  {
    id: "3",
    content: "Added a new device",
    type: "error",
    time: "2023-05-18T09:30:00",
  },
  {
    id: "4",
    content: "Added a new device",
    type: "error",
    time: "2023-04-18T09:30:00",
  },
  {
    id: "5",
    content: "Added a new device",
    type: "info",
    time: "2023-04-18T09:30:00",
  },
  {
    id: "6",
    content: "Added a new device",
    type: "error",
    time: "2023-04-18T09:30:00",
  },
  {
    id: "7",
    content: "Added a new device",
    type: "error",
    time: "2023-04-18T09:30:00",
  },
  {
    id: "8",
    content: "Added a new device",
    type: "error",
    time: "2023-04-18T09:30:00",
  },
  {
    id: "9",
    content: "Added a new device",
    type: "info",
    time: "2023-04-18T09:30:00",
  },
  {
    id: "10",
    content: "Added a new device",
    type: "error",
    time: "2023-04-18T09:30:00",
  },
  {
    id: "11",
    content: "Added a new device",
    type: "error",
    time: "2023-04-18T09:30:00",
  },
  {
    id: "12",
    content: "Added a new device",
    type: "info",
    time: "2023-04-18T09:30:00",
  },
  {
    id: "13",
    content: "Added a new device",
    type: "error",
    time: "2022-04-18T09:30:00",
  },
];

const getTimeAgo = (time) => {
  const momentTime = moment(time);
  const now = moment();
  const minutesAgo = now.diff(momentTime, "minutes");

  if (minutesAgo < 60) {
    return momentTime.fromNow();
  } else if (minutesAgo < 1440) {
    return momentTime.format("h:mm A");
  } else {
    return momentTime.format("MMM D, YYYY");
  }
};

export default function HistoryScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState(data);

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Text>{item.content}</Text>
        <Badge
          color={item.type === "info" ? colors.cold : colors.red}
          content={item.type}
        ></Badge>
      </View>

      <Text style={styles.time}>{getTimeAgo(item.time)}</Text>
    </View>
  );

  const renderSeparator = () => (
    <View
      style={{
        height: 1,
        backgroundColor: colors.secondaryText,
        opacity: 0.28,
      }}
    />
  );

  // TODO - Implement when joining with backend
  /*const fetchLogs = async () => {
    setIsLoading(true);
    const logs = await api.getLogs();
    setIsLoading(false);
    setLogs(rules);
  };

  useEffect(() => {
    fetchLogs();
  }, []);
  */

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.body}>
        <Text style={styles.sectionHeader}>Logs</Text>

        {isLoading && (
          <ActivityIndicator
            size={"large"}
            color={colors.white}
            style={styles.loadingIndicator}
          />
        )}

        <View style={styles.scrollBody}>
          <View style={styles.content}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={renderSeparator}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
  },
  body: {
    flex: 0.85,
    width: "85%",
    alignItems: "flex-start",
    paddingVertical: 20,
  },
  sectionHeader: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.primary,
    paddingTop: 16,
    paddingBottom: 5,
  },
  scrollBody: {
    height: "100%",
    width: "100%",
    borderRadius: 22,
    marginTop: 20,
    backgroundColor: colors.white,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    padding: 20,
  },
  loadingIndicator: {
    width: "100%",
    marginVertical: 10,
  },
  time: { color: colors.secondaryText, marginTop: 10, fontSize: 10 },
  cardContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    marginBottom: 100,
  },
});
