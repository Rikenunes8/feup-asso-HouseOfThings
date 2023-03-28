import React, { useContext } from "react";
import IconModal from "../../components/modal/IconModal";
import AddDeviceForm from "../../components/device_form/AddDeviceForm";
import ModalsContext from "../../contexts/ModalsContext";
import DevicesContext from "../../contexts/DevicesContext";
import AddDeviceContext from "../../contexts/AddDeviceContext";

import utils from "../../utils/utils";
import { getDeviceIcon } from "../../utils/DevicePropsUtils";
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
    deviceSubcategory,
    deviceCategory,
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
      category: deviceCategory,
    };

    console.log(`Adding ${deviceSubcategory}...`);
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
      title={(deviceSubcategory && utils.capitalize(deviceSubcategory)) || "Title"}
      leftIcon="close"
      rightIcon="check"
      leftIconCallback={() => {
        setChooseDeviceModalVisible(true);
        setAddDeviceFormModalVisible(false);
        resetAddDeviceContext();
        setInputOnFocus(false);
      }}
      rightIconCallback={() => {
        connectCallback();
      }}
      icon={getDeviceIcon(deviceCategory)}
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
