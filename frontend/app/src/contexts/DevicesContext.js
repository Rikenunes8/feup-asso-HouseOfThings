import { createContext, useState } from "react";
const DevicesContext = createContext();

export const DevicesProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);
  const [deviceEdit, setDeviceEdit] = useState({
    edit: false,
    device: {},
  });

  const addDevice = (newDevice) => {
    setDevices([newDevice, ...devices]);
  };

  const updateDevice = (newUpdateDevice, id) => {
    setDevices(
      devices.map((device) =>
        device.id === id ? { ...device, ...newUpdateDevice } : device
      )
    );
  };

  const removeDevice = (newRemovedDevice) => {
    setDevices(devices.filter((device) => device.id !== newRemovedDevice.id));
  };

  const editDevice = (newEditDevice) => {
    setDeviceEdit({
      edit: true,
      device: { ...newEditDevice },
    });
  };
  return (
    <DevicesContext.Provider
      value={{
        devices,
        setDevices,
        addDevice,
        removeDevice,
        editDevice,
        updateDevice,
        deviceEdit,
        setDeviceEdit,
      }}
    >
      {children}
    </DevicesContext.Provider>
  );
};
export default DevicesContext;
