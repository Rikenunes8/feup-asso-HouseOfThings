import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  Image,
  TouchableOpacity,
} from "react-native";

import DetailsModal from "./DetailsModal";
import LightDetails from "./device_details/light/LightDetails.js";
import LightDetailsContextMenu from "./device_details/light/LightDetailsContextMenu";
import DevicesContext from "../contexts/DevicesContext";

import api from "../api/api";
import colors from "../../configs/colors";
import AddDeviceFormCard from "./device_form/AddDeviceFormCard";

export default function DeviceCard({ device }) {
  const { updateDevice } = useContext(DevicesContext);

  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  onOfHandler = (isEnabled) => {
    console.log(`Turning ${isEnabled ? "off" : "on"} device...`);

    const action = isEnabled ? "turnOff" : "turnOn";
    api.actionDevice(device.uid, { action: action });
    updateDevice({ on: !device.on }, device.uid);
  };

  return (
    <TouchableOpacity
      style={styles.deviceCard}
      onPress={() => setIsDetailsModalVisible(!isDetailsModalVisible)}
    >
      <DetailsModal
        title={"Light Bulb"}
        modalVisible={isDetailsModalVisible}
        leftIcon="close"
        rightIcon="check"
        leftIconCallback={() => setIsDetailsModalVisible(false)}
        rightIconCallback={() => setIsContextMenuVisible(!isContextMenuVisible)}
     
          // TODO: Change this to a dynamic component (depending on device type)
        
        //modalContent={<LightDetails on={device.on} handler={onOfHandler} />} // TODO: Change this to a dynamic component (depending on device type)
        modalContent={<AddDeviceFormCard on={device.on} handler={onOfHandler} />}
        // forma
      />


    </TouchableOpacity>
  );
}

/*<View style={{ justifyContent: "center" }}>
  <Text style={styles.deviceName}>{device.name || "Philips Bulb"}</Text>
  <Text style={styles.divisionText}>
    {device.division || "Living Room"}
  </Text>
</View>*/

const styles = StyleSheet.create({
  deviceCard: {
    width: "100%",
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
    objectFit: "contain",
  },
  deviceName: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.primaryText,
  },
});
