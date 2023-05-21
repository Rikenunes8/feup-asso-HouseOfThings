import React, { useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
} from "react-native";

import Header from "../components/header/Header";
import DivisionCard from "../components/division_cards/DivisionCard";
import NewDivisionCard from "../components/division_cards/NewDivisionCard";
import DeviceCardPicker from "../components/device_cards/DeviceCardPicker";
import DevicesContext from "../contexts/DevicesContext";
import DivisionsContext from "../contexts/DivisionsContext";

import colors from "../../configs/colors";
import api from "../api/api";

export default function HomeScreen() {
  const { devices, setDevices, setInitialized } = useContext(DevicesContext);
  const { divisions, setDivisions } = useContext(DivisionsContext);
  const [selectedDivision, setSelectedDivision] = useState(null);

  const fetchDevices = async () => {
    const devs = await api.getDevices();
    setDevices(devs.filter((device) => device !== null));
    setTimeout(() => {
      setInitialized(true);
    }, 200);
  };

  const fetchDivisions = async () => {
    const divs = await api.getDivisions();
    setDivisions(divs);
  };

  const showDevices = () => {
    let filteredDevices = devices;
    if (selectedDivision) {
      filteredDevices = filteredDevices.filter((device) =>
        device.divisions.includes(selectedDivision.id)
      );
    }

    if (filteredDevices.length > 0) {
      return filteredDevices.map((device, key) => (
        <DeviceCardPicker key={key} device={device} />
      ));
    }

    return (
      <Text style={styles.sectionMessage}>
        No devices connected
        {selectedDivision ? " in " + selectedDivision.name : "..."}
      </Text>
    );
  };

  useEffect(() => {
    fetchDevices();
    fetchDivisions();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.body}>
        <Text style={styles.sectionHeader}>Divisions</Text>
        <View style={styles.divisionsBarContainer}>
          <ScrollView horizontal>
            <DivisionCard
              division={{
                name: "All",
                icon: "all-icon",
                numDevices: devices.length,
              }}
              onPress={() => setSelectedDivision(null)}
              allowLongPress={false}
              highlighted={selectedDivision === null}
            />
            {divisions.map((division, key) => (
              <DivisionCard
                key={key}
                division={division}
                onPress={() => setSelectedDivision(division)}
                allowLongPress={true}
                highlighted={
                  selectedDivision && selectedDivision.id === division.id
                }
              />
            ))}
            <NewDivisionCard />
          </ScrollView>
        </View>

        <Text style={styles.sectionHeader}>Devices</Text>
        <View style={styles.scrollBody}>
          <ScrollView>{showDevices()}</ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 0.85,
    width: "85%",
    alignItems: "flex-start",
    paddingVertical: 20,
  },
  divisionsBarContainer: {
    height: 120,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
  },
  sectionHeader: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.primary,
    paddingTop: 16,
    paddingBottom: 5,
  },
  sectionMessage: {
    color: colors.primaryText,
    alignSelf: "flex-start",
    fontStyle: "italic",
    marginVertical: 5,
    fontSize: 17,
  },
  scrollBody: {
    marginBottom: 310,
    width: "100%",
  },
});
