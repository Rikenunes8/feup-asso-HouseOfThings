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
      <View style={styles.card}>
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
      }}
    />
  );

  const fetchLogs = async () => {
    setIsLoading(true);
    const logs = await api.getLogs();
    setIsLoading(false);
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

        <View style={styles.scrollBody}>
          <View style={styles.content}>
            <FlatList
              data={logs}
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
  description: {
    flex: 1,
    flexWrap: "wrap",
  },
  content: {
    marginBottom: 120,
  },
});
