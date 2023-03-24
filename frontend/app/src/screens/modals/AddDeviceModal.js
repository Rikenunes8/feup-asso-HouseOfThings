import React, { useContext } from "react";
import IconModal from "../../components/modal/IconModal";
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
    isDeviceFormModalLoading,
    setIsDeviceFormModalLoading,
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

  const requiredFields = [
    { field: deviceUUID, message: "Device UUID is required." },
    { field: deviceName, message: "Device name is required." },
  ];

  const checkRequiredFields = () => {
    for (let i = 0; i < requiredFields.length; i++) {
      if (!requiredFields[i].field) {
        utils.showErrorMessage(requiredFields[i].message);
        return false;
      }
    }
    return true;
  };

  const connectCallback = () => {
    if (!checkRequiredFields()) return;

    const device = {
      name: deviceName,
      divisions: [deviceDivision],
      group: deviceGroup,
    };

    console.log(`Adding ${deviceType}...`);
    setIsDeviceFormModalLoading(true);
    api.addDevice(deviceUUID, device).then((success) => {
      setIsDeviceFormModalLoading(false);
      if (success) {
        addDevice({
            uid: deviceUUID,
            ...device,
            enabled: false,
          })
        setAddDeviceFormModalVisible(false);
        resetAddDeviceContext();
      } else {
        console.log("Failed to connect device");
        utils.showErrorMessage("Failed to connect device");
      }
    });
  };

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
        connectCallback();
      }}
      icon={require("../../../../assets/lightbulb.png")} // TODO: Change this to a dynamic icon
      modalContent={
        <AddDeviceForm
          inputOnFocus={inputOnFocus}
          setInputOnFocus={setInputOnFocus}
        />
      }
      inputOnFocus={inputOnFocus}
      isLoading={isDeviceFormModalLoading}
    />
  );
}
