import React from "react";
import { StyleSheet, Text } from "react-native";

import DeviceDetailsModal from "../../screens/modals/DeviceDetailsModal";
import ThermometerDetails from "../device_details/ThermometerDetails";
import DeviceCard from "./DeviceCard";

import colors from "../../../configs/colors";
import utils from "../../utils/utils";

export default function ThermometerCard({ device }) {
  return (
    <DeviceCard
      device={device}
      specificFeature={
        <Text
          style={styles(utils.isTemperatureCold(device.temperature)).feature}
        >
          {device.temperature}ºC
        </Text>
      }
      modal={
        <DeviceDetailsModal
          device={device}
          icon={utils.getDeviceIcon(device.subcategory)}
          modalContent={<ThermometerDetails temperature={device.temperature} />}
        />
      }
    />
  );
}

const styles = (isCold = False) =>
  StyleSheet.create({
    feature: {
      marginTop: 6,
      marginRight: 8,
      fontWeight: "900",
      color: isCold ? colors.cold : colors.warm,
    },
  });
