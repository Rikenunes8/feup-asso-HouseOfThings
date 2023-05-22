import { createContext, useState } from "react";
const DevicesContext = createContext();

export const DevicesProvider = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const [devices, setDevices] = useState([]);
  const [deviceEdit, setDeviceEdit] = useState({
    edit: false,
    device: {},
  });

  const addDevice = (newDevice) => {
    setInitialized(false);
    setDevices([newDevice, ...devices]);
    setTimeout(() => {
      setInitialized(true);
    }, 200);
  };

  const updateDevice = (newUpdateDevice, uid) => {
    setInitialized(false);
    setDevices(
      devices.map((device) =>
        device.uid === uid ? { ...device, ...newUpdateDevice } : device
      )
    );
    setTimeout(() => {
      setInitialized(true);
    }, 200);
  };

  const removeDevice = (uid) => {
    setInitialized(false);
    setDevices(devices.filter((device) => device.uid !== uid));
    setTimeout(() => {
      setInitialized(true);
    }, 200);
  };

  const renameDevice = (uid, name) => {
    setInitialized(false);
    setDevices(
      devices.map((device) =>
        device.uid === uid ? { ...device, name: name } : device
      )
    );
    setTimeout(() => {
      setInitialized(true);
    }, 200);
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
        initialized,
        setInitialized,
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
