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

  const updateDevice = (newUpdateDevice, uid) => {
    setDevices(
      devices.map((device) =>
        device.uid === uid ? { ...device, ...newUpdateDevice } : device
      )
    );
  };

  const removeDevice = (uid) => {
    setDevices(devices.filter((device) => device.uid !== uid));
  };

  const renameDevice = (uid, name) => {
    setDevices(
      devices.map((device) =>
        device.uid === uid ? { ...device, name: name } : device
      )
    );
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
        renameDevice,
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
