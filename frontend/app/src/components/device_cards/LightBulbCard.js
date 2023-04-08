import React, { useContext } from "react";
import { Switch } from "react-native";

import DevicesContext from "../../contexts/DevicesContext";
import DeviceDetailsModal from "../../screens/modals/DeviceDetailsModal";
import LightBulbDetails from "../device_details/LightBulbDetails";
import DeviceCard from "./DeviceCard";
import utils from "../../utils/utils";

import api from "../../api/api";
import colors from "../../../configs/colors";

export default function LightBulbCard({ device }) {
  const { updateDevice } = useContext(DevicesContext);

  const onOffHandler = (isEnabled) => {
    console.log(`Turning ${isEnabled ? "off" : "on"} device...`);

    const action = isEnabled ? "turnOff" : "turnOn";
    api.actionDevice(device.uid, { action: action });
    updateDevice({ on: !device.on }, device.uid);
  };

  return (
    <DeviceCard
      device={device}
      specificFeature={
        <Switch
          trackColor={{ false: colors.desactive, true: colors.active }}
          thumbColor={device.on ? colors.white : colors.white}
          onValueChange={() => onOffHandler(device.on)}
          value={device.on}
        />
      }
      modal={
        <DeviceDetailsModal
          device={device}
          icon={utils.getDeviceIcon(device.subcategory)}
          modalContent={
            <LightBulbDetails on={device.on} handler={onOffHandler} />
          }
        />
      }
    />
  );
}
