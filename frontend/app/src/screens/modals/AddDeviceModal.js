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
    isDeviceFormModalLoading,
    setIsDeviceFormModalLoading,
  } = useContext(ModalsContext);
  const {
    deviceType,
    deviceGroup,
    deviceName,
    deviceDivision,
    resetAddDeviceContext,
  } = useContext(AddDeviceContext);

  const [inputOnFocus, setInputOnFocus] = React.useState(false);

  connectCallback = () => {
    if (deviceName === "") {
      utils.showErrorMessage("Device name is required.");
      return;
    }
    const device = {
      name: deviceName,
      divisions: [deviceDivision],
      group: deviceGroup,
    };

    console.log(`Adding ${deviceType}...`);
    setIsDeviceFormModalLoading(true);

    // TODO: remove hardcoded
    api.addDevice("1", device).then((success) => {
      setIsDeviceFormModalLoading(false);
      if (success) {
        console.log("Device connected successfully");
        setAddDeviceFormModalVisible(false);
        resetAddDeviceContext();
        addDevice({
          uid: "1",
          ...device,
          enabled: false,
        });
        return;
      }

      console.log("Failed to connect device");
      utils.showErrorMessage("Failed to connect device");
    });
  };

  return (
    <IconModal
      visible={addDeviceFormModalVisible}
      title={(deviceType && utils.capitalize(deviceType)) || "Title"}
      leftIcon="close"
      rightIcon="check"
      leftIconCallback={() => {
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
