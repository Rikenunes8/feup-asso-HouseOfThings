import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import DeviceCard from "../components/DeviceCard";
import DevicesContext from "../contexts/DevicesContext";

import colors from "../../configs/colors";
import api from "../api/api";

export default function HomeScreen() {
  const [name, setName] = useState("Tiago");

  const { devices, setDevices } = useContext(DevicesContext);

  const fetchDevices = async () => {
    const devs = await api.getDevices();
    setDevices(devs);
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          disabled={true} //TODO remove when we have a profile page
          style={styles.iconView}
        >
          <Icon name={"user"} size={20} color={colors.primaryText} />
        </TouchableOpacity>
        <Text style={styles.welcomeMessage}>Hello, {name}!</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.sectionHeader}>Devices</Text>
        {devices.length ? (
          devices.map((device, key) => <DeviceCard key={key} device={device} />)
        ) : (
          <Text style={styles.sectionMessage}>No devices connected...</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 0.85,
    width: "85%",
    alignItems: "center",
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
  },
  header: {
    width: "100%",
    flex: 0.15,
    backgroundColor: colors.primary,
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  iconView: {
    padding: 12,
    borderRadius: 24,
    alignSelf: "flex-end",
    backgroundColor: colors.white,
  },
  sectionHeader: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.primary,
    alignSelf: "flex-start",
  },
  sectionMessage: {
    color: colors.primaryText,
    alignSelf: "flex-start",
    fontStyle: "italic",
    marginVertical: 5,
    fontSize: 17,
  },
  welcomeMessage: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "bold",
    marginStart: 15,
  },
});
