import React, { useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";

import UsernameContext from "../contexts/UsernameContext";
import DivisionCard from "../components/DivisionCard";
import NewDivisionCard from "../components/NewDivisionCard";
import DeviceCardPicker from "../components/device_cards/DeviceCardPicker";
import DevicesContext from "../contexts/DevicesContext";
import DivisionsContext from "../contexts/DivisionsContext";

import colors from "../../configs/colors";
import api from "../api/api";

export default function HomeScreen() {
  const { devices, setDevices } = useContext(DevicesContext);
  const { divisions, setDivisions } = useContext(DivisionsContext);
  const [selectedDivision, setSelectedDivision ] = useState(null);
  const { username } = useContext(UsernameContext);

  const navigation = useNavigation();

  const fetchDevices = async () => {
    const devs = await api.getDevices();
    setDevices(devs);
  };

  const fetchDivisions = async () => {
    const divs = await api.getDivisions();
    setDivisions(divs);
  };

  const showDevices = () => {
    let filteredDevices = devices;
    if (selectedDivision) {
      filteredDevices = filteredDevices.filter((device) => device.divisions.includes(selectedDivision));
    }

    if (filteredDevices.length > 0) {
      return filteredDevices.map((device, key) => <DeviceCardPicker key={key} device={device} />);
    }

    if (selectedDivision) {
      return <Text style={styles.sectionMessage}>No devices connected in {selectedDivision}...</Text>;
    }
  
    return <Text style={styles.sectionMessage}>No devices connected...</Text>;
  }

  useEffect(() => {
    fetchDevices();
    fetchDivisions();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          // on press should open the profile screen
          onPress={() => navigation.navigate("Profile")}
          style={styles.iconView}
        >
          <Icon name={"user"} size={20} color={colors.primaryText} />
        </TouchableOpacity>
        <Text style={styles.welcomeMessage}>Hello, {username.trim()}!</Text>
      </View>

      
      <View style={styles.body}>
        <Text style={styles.sectionHeader}>Divisions</Text>
        <View style={styles.divisionsBarContainer}>
          <ScrollView horizontal>
            <DivisionCard
              division={{ name: "All", icon: "all-icon", numDevices: devices.length }}
              onPress={() => setSelectedDivision(null)}
              allowLongPress={false}
              highlighted={selectedDivision === null}
            />
            {divisions.map((division, key) =>
              <DivisionCard
                key={key}
                division={division}
                onPress={() => setSelectedDivision(division.name)}
                allowLongPress={true}
                highlighted={selectedDivision === division.name}
              />
            )}
            <NewDivisionCard />
          </ScrollView>
        </View>
        
        <Text style={styles.sectionHeader}>Devices</Text>
        {showDevices()}
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
    paddingTop: 16,
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
