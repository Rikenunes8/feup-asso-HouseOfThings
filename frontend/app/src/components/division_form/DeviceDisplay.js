import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import colors from "../../../configs/colors";

export default function DeviceDisplay({deviceName, deviceGroup}) {

  return (
    <Text key={deviceName + deviceGroup}>{deviceName} e {deviceGroup}</Text>
  );
}
