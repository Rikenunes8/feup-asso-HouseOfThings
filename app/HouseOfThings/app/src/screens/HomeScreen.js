import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  ActivityIndicator,
} from "react-native";
import DeviceCard from "../components/DeviceCard";
import colors from "../../configs/colors";
import server from "../../configs/server";

const server_url = "http://" + server.ip + ":" + server.port;

export default function HomeScreen() {
  const [isLoading, setLoading] = useState(true);
  const [name, setName] = useState("Tiago");
  const [devices, setDevices] = useState([
    { name: "Philips Bulb", division: "Family Room", enabled: true },
    { name: "Philips Bulb", division: "Tiago Room", enabled: false },
  ]);

  // TODO: move this out of here
  const getDevices = async () => {
    try {
      const response = await fetch(server_url + "/devices");
      const json = await response.json();
      setDevices(Object.values(json));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDevices();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeMessage}>Hello, {name}!</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.sectionHeader}>Devices</Text>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          devices.map((device, key) => (
            <DeviceCard
              key={key}
              name={"Philips Bulb"} // TODO: device.name
              division={"Family Room"} // TODO: device.division
              enabled={device.state}
            />
          ))
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 0.85,
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
    justifyContent: "flex-end",
    padding: 20,
  },
  sectionHeader: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.primary,
    alignSelf: "flex-start",
  },
  welcomeMessage: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "bold",
    marginStart: 15,
  },
});
