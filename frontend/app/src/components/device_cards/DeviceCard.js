import React, { useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import ModalsContext from "../../contexts/ModalsContext";
import DivisionsContext from "../../contexts/DivisionsContext";

import utils from "../../utils/utils";
import colors from "../../../configs/colors";

export default function DeviceCard({ device, specificFeature, modal }) {
  const { setDeviceDetailsModalVisible } = useContext(ModalsContext);
  const { divisions } = useContext(DivisionsContext);

  const deviceDivisions = device.divisions
    .map((divisionId) => {
      const division = divisions.find((division) => division.id === divisionId);
      if (division) return division.name;
    })
    .filter((division) => division != null)
    .join(", ");

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

      <View style={styles.deviceContent}>
        <View style={{ justifyContent: "center" }}>
          <Text style={styles.deviceName}>{device.name}</Text>
          <Text style={styles.divisionText}>{deviceDivisions}</Text>
        </View>

        {specificFeature}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deviceCard: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: colors.white,
    borderRadius: 15,
    marginVertical: 10,
    padding: 10,
  },
  deviceIcon: {
    width: 50,
    height: 50,
    objectFit: "contain",
    marginRight: 15,
  },
  deviceContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deviceName: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.primaryText,
  },
  divisionText: {
    color: colors.secondaryText,
  },
});
