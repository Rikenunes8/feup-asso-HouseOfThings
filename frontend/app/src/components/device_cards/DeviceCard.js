import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  Image,
  TouchableOpacity,
} from "react-native";

import ModalsContext from "../../contexts/ModalsContext";
import utils from "../../utils/utils";

import colors from "../../../configs/colors";

export default function DeviceCard({ device, specificFeature, modal }) {
  const { setDeviceDetailsModalVisible } = useContext(ModalsContext);

  return (
    <TouchableOpacity
      style={styles.deviceCard}
      onPress={() => setDeviceDetailsModalVisible(device.uid)}
    >
      {modal}

      <Image
        style={styles.deviceIcon}
        source={utils.getDeviceIcon(device.subcategory)}
      />

      <View style={{ justifyContent: "center" }}>
        <Text style={styles.deviceName}>{device.name}</Text>
        <Text style={styles.divisionText}>{device.divisions[0]}</Text>
      </View>

      {specificFeature}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deviceCard: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderRadius: 15,
    marginVertical: 10,
    padding: 10,
  },
  deviceIcon: {
    width: 50,
    height: 50,
    objectFit: "contain",
  },
  deviceName: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.primaryText,
  },
  divisionText: {
    color: colors.secondaryText,
    textTransform: "capitalize",
  },
});
