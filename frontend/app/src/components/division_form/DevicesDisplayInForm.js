import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";

import api from "../../api/api";
import colors from "../../../configs/colors";
import DeviceDisplay from "./DeviceDisplay";
import DevicesContext from "../../contexts/DivisionsContext"

export default function DevicesDisplayInForm() {
/*
  const { devices, setDevices } = useContext(DevicesContext);
  const fetchDevices = async () => {
    
    const devs = await api.getDevices();
    setDevices(devs);
    
    setDevices([{name: "Philips", group: "light"}])
  };

  useEffect(() => {
    fetchDevices();
  }, []);
*/
  const showDevices = () => {
    let devices = [
      {name: "Philips Bulb", divisions: ["Family Room"], subcategory: "light bulb", on: true},
      {name: "Philips Bulb", divisions: ["Tiago Room"], subcategory: "light bulb", on: false},
      {name: "Philips Bulb", divisions: ["Tiago Room"], subcategory: "light bulb", on: false}
    ]
    if (devices) {
      return devices.map((device) => (
        <DeviceDisplay device={device} />
      ))
    }
  }

  return (
    <View
      style={styles.deviceDisplayContainer}
    >
        <View style={styles.search}>
          <Text style={styles.title}>DEVICES</Text>
          <Image source={require("../../../../assets/search.png")} />
        </View>

        <View style={styles.devices}>
          {showDevices()}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.primary
  },
  deviceDisplayContainer: {
    marginTop: 15,
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  search: {
    paddingHorizontal: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  devices: {
    marginTop: 20,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap"
  }
});
