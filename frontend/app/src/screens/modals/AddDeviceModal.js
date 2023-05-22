import React, { useContext } from "react";
import IconModal from "../../components/modal/IconModal";
import AddDeviceForm from "../../components/device_form/AddDeviceForm";
import ModalsContext from "../../contexts/ModalsContext";
import DevicesContext from "../../contexts/DevicesContext";
import DivisionsContext from "../../contexts/DivisionsContext";
import AddDeviceContext from "../../contexts/AddDeviceContext";

import utils from "../../utils/utils";
import api from "../../api/api";

export default function AddDeviceModal() {
  const { addDevice } = useContext(DevicesContext);
  const { setDivisions } = useContext(DivisionsContext);

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

  const fetchDivisions = async () => {
    const divs = await api.getDivisions();
    if (divs != null) setDivisions(divs);
  };

  const connectCallback = () => {
    if (!checkRequiredFields()) return;

    console.log("Device UUID: ", deviceCategory);

    const device = {
      name: deviceName,
      divisions: deviceDivision != null ? [deviceDivision] : [],
      category: deviceCategory,
      subcategory: deviceSubcategory,
      protocol: JSON.parse(deviceUUID).protocol,
    };

    console.log(`Adding ${deviceSubcategory}...`);
    setIsDeviceFormModalLoading(true);
    api.addDevice(JSON.parse(deviceUUID).uuid, device).then((newDevice) => {
      setIsDeviceFormModalLoading(false);
      if (newDevice != null) {
        addDevice(newDevice);
        fetchDivisions();
        setAddDeviceFormModalVisible(false);
        resetAddDeviceContext();
      } else {
        utils.showErrorMessage("Failed to connect device");
      }
    });
  };

  return (
    <IconModal
      visible={addDeviceFormModalVisible}
      title={
        (deviceSubcategory && utils.capitalize(deviceSubcategory)) || "Title"
      }
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
      icon={utils.getDeviceIcon(deviceSubcategory)}
      type="device"
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
