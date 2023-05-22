import React, { useState, useEffect } from "react";
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
import api from "../api/api";

import moment from "moment";

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
  const [logs, setLogs] = useState([]);

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.description}>{item.content}</Text>
        <Badge
          color={
            item.type === "info"
              ? colors.cold
              : item.type === "warn"
              ? colors.yellow
              : colors.red
          }
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
        marginHorizontal: 20,
      }}
    />
  );

  const fetchLogs = async () => {
    setIsLoading(true);
    const logs = await api.getLogs();
    setIsLoading(false);
    logs.sort((a, b) => new Date(b.time) - new Date(a.time));
    setLogs(logs);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

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

        <View style={styles.logsContainer}>
          <FlatList
            data={logs}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={renderSeparator}
          />
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
  loadingIndicator: {
    width: "100%",
    marginVertical: 10,
  },
  logsContainer: {
    width: "100%",
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 130,
    backgroundColor: colors.white,
  },
  cardContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  time: {
    color: colors.secondaryText,
    marginTop: 3,
    fontSize: 12,
  },
  description: {
    flex: 1,
    flexWrap: "wrap",
  },
});
