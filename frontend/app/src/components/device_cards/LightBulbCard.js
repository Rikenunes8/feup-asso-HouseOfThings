import React, { useContext, useState } from "react";
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
  const [disabled, setDisabled] = useState(false);

  const onOffHandler = (isEnabled, setDisabled) => {
    console.log(`Turning ${isEnabled ? "off" : "on"} device...`);

    setDisabled(true);
    device.on = !device.on;

    const action = isEnabled ? "turnOff" : "turnOn";
    api.actionDevice(device.uid, { action: action }).then((success) => {
      setDisabled(false);
      if (success) {
        console.log(`Changed light status successfully`);
        updateDevice({ on: device.on }, device.uid);
        return;
      }

      updateDevice({ on: !device.on }, device.uid);
      console.log("Failed to change light status");
      utils.showErrorMessage("Failed to change light status");
    });
  };

  return (
    <DeviceCard
      device={device}
      specificFeature={
        <Switch
          trackColor={{ false: colors.desactive, true: colors.active }}
          thumbColor={device.on ? colors.white : colors.white}
          onValueChange={() => onOffHandler(device.on, setDisabled)}
          value={device.on}
          disabled={disabled}
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
