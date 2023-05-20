import React, { useContext, useState } from "react";
import { Switch } from "react-native";

import DevicesContext from "../../contexts/DevicesContext";
import DeviceDetailsModal from "../../screens/modals/DeviceDetailsModal";
import LightBulbRGBDetails from "../device_details/LightBulbRGBDetails";
import DeviceCard from "./DeviceCard";
import utils from "../../utils/utils";

import api from "../../api/api";
import colors from "../../../configs/colors";

export default function LightBulbRGBCard({ device }) {
  const { updateDevice } = useContext(DevicesContext);
  const [disabled, setDisabled] = useState(false);

  const onOffHandler = (isEnabled, setDisabled) => {
    console.log(`Turning ${isEnabled ? "off" : "on"} device...`);

    setDisabled(true);
    device.power = !device.power; // Optimistic update (may be reverted if the request fails)

    const action = isEnabled ? "turn_off" : "turn_on";
    api.actionDevice(device.uid, { action: action }).then((deviceUpdated) => {
      setDisabled(false);
      if (deviceUpdated != null) {
        console.log(`Changed light status successfully`);
        updateDevice(deviceUpdated, device.uid);
        return;
      }

      updateDevice({ power: !device.power }, device.uid);
      console.log("Failed to change light status");
    });
  };

  return (
    <DeviceCard
      device={device}
      specificFeature={
        <Switch
          trackColor={{ false: colors.desactive, true: device.color }}
          thumbColor={device.power ? colors.white : colors.white}
          onValueChange={() => onOffHandler(device.power, setDisabled)}
          value={device.power}
          disabled={disabled}
        />
      }
      modal={
        <DeviceDetailsModal
          device={device}
          icon={utils.getDeviceIcon(device.subcategory)}
          modalContent={
            <LightBulbRGBDetails
              uid={device.uid}
              power={device.power}
              color={device.color}
              brightness={device.brightness}
              powerHandler={onOffHandler}
            />
          }
        />
      }
    />
  );
}
