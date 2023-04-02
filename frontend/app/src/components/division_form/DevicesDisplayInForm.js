import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  Image,
  TouchableOpacity,
} from "react-native";

import api from "../../api/api";
import colors from "../../../configs/colors";

export default function DevicesDisplayInForm() {

  return (
    <View
      style={styles.deviceDisplayContainer}
    >
        <Text style={styles.title}>DEVICES</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.primary
  },
  deviceDisplayContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: colors.white,
    margin: 10,
    padding: 10,
  },
  
});
