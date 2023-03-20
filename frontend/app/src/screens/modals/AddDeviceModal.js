import React, { useContext } from "react";
import DetailsModal from "../../components/DetailsModal";
import AddDeviceForm from "../../components/device_form/AddDeviceForm";
import DevicesContext from "../../contexts/DevicesContext";
import AddDeviceContext from "../../contexts/AddDeviceContext";

import utils from "../../utils/utils";
import api from "../../api/api";

export default function AddDeviceModal({ modalVisible, setModalVisible }) {
  const { addDevice } = useContext(DevicesContext);
  const {
    deviceType,
    deviceGroup,
    deviceName,
    deviceDivision,
    setDeviceName,
    setDeviceDivision,
  } = useContext(AddDeviceContext);

  return (
    <DetailsModal
      title={deviceType && utils.capitalize(deviceType)}
      modalVisible={modalVisible}
      leftIcon="close"
      rightIcon="check"
      leftIconCallback={() => {
        setModalVisible(false);
      }}
      rightIconCallback={() => {
        if (deviceName === "") {
          utils.showErrorMessage("Device name is required.");
          return;
        }
        console.log(`Adding ${deviceType}...`);
        const device = {
          name: deviceName,
          divisions: [deviceDivision],
          group: deviceGroup,
        };

        // TODO: remove hardcoded
        api.addDevice("1", device).then((success) => {
          success
            ? addDevice({
                uid: "1",
                ...device,
                enabled: false,
              })
            : console.log("Failed to add device");
        });
      }}
      modalContent={<AddDeviceForm />}
      onShow={() => {
        setDeviceName("");
        setDeviceDivision(null);
      }}
    />
  );
}
