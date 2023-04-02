import React from "react";
import { Text } from "react-native";

import DeviceDetailsModal from "../../screens/modals/DeviceDetailsModal";
import ThermometerDetails from "../device_details/ThermometerDetails";
import DeviceCard from "./DeviceCard";
import utils from "../../utils/utils";

export default function ThermometerCard({ device }) {
  return (
    <DeviceCard
      device={device}
      specificFeature={<Text> {device.temperature}ºC </Text>}
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
