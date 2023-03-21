import React, { useContext } from "react";
import IconModal from "../../components/IconModal";
import AddDeviceForm from "../../components/device_form/AddDeviceForm";
import ModalsContext from "../../contexts/ModalsContext";
import DevicesContext from "../../contexts/DevicesContext";
import AddDeviceContext from "../../contexts/AddDeviceContext";

import utils from "../../utils/utils";
import api from "../../api/api";

export default function AddDeviceModal() {
  const { addDevice } = useContext(DevicesContext);

  const {
    addDeviceFormModalVisible,
    setAddDeviceFormModalVisible,
    setChooseDeviceModalVisible,
  } = useContext(ModalsContext);

  const {
    deviceUUID,
    deviceType,
    deviceGroup,
    deviceName,
    deviceDivision,
    resetAddDeviceContext,
  } = useContext(AddDeviceContext);

  const [inputOnFocus, setInputOnFocus] = React.useState(false);

  return (
    <IconModal
      visible={addDeviceFormModalVisible}
      title={(deviceType && utils.capitalize(deviceType)) || "Title"}
      leftIcon="close"
      rightIcon="check"
      leftIconCallback={() => {
        setChooseDeviceModalVisible(true);
        setAddDeviceFormModalVisible(false);
        resetAddDeviceContext();
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

        api.addDevice(deviceUUID, device).then((success) => {
          success
            ? addDevice({
                uid: deviceUUID,
                ...device,
                enabled: false,
              })
            : console.log("Failed to add device");
          setAddDeviceFormModalVisible(false);
          resetAddDeviceContext();
        });
      }}
      icon={require("../../../../assets/lightbulb.png")} // TODO: Change this to a dynamic icon
      modalContent={
        <AddDeviceForm
          inputOnFocus={inputOnFocus}
          setInputOnFocus={setInputOnFocus}
        />
      }
      inputOnFocus={inputOnFocus}
    />
  );
}
