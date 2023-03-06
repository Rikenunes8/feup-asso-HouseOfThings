import React, { useState } from "react";
import { Image } from "react-native";
import { Switch } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  SectionList,
  Platform,
} from "react-native";
import colors from "../../configs/colors";

export default function DeviceCard() {
  const [isEnabled, setIsEnabled] = useState(false); //TODO
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState); //TODO

  return (
    <View style={styles.deviceCard}>
      <Image
        style={styles.deviceIcon}
        source={require("../../../assets/icon.png")}
      />
      <View>
        <Text style={styles.deviceName}>Philips Bulb</Text>
        <Text style={{ color: colors.gray }}>Family Room</Text>
      </View>
      <Switch
        trackColor={{ false: colors.gray, true: colors.accent }}
        thumbColor={isEnabled ? colors.white : colors.white}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  deviceCard: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: colors.white,
    borderRadius: 15,
    marginVertical: 10,
    padding: 10,
  },
  deviceIcon: {
    width: 50,
    height: 50,
  },
  deviceName: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
