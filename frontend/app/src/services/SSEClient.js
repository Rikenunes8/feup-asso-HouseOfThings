import { useEffect, useContext, useState } from "react";
import EventSource from "react-native-event-source";

import DevicesContext from "../contexts/DevicesContext";
import api from "../api/api";

export default function SSEClient() {
  const { initialized, devices, updateDevice } = useContext(DevicesContext);
  const [listenerURL, setListenerURL] = useState(null);

  const getListenerURL = async () => {
    const url = await api.getDevicesListenerURL();
    setListenerURL(url);
  };

  useEffect(() => {
    getListenerURL();
  }, []);

  useEffect(() => {
    if (!initialized) return;
    if (!listenerURL) return;

    const devicesSSE = new EventSource(listenerURL);

    const updateHandler = (event) => {
      console.log("SSE: devices update...", event.data);
      const json = event.data
        .replace(/'/g, '"')
        .replace(/True/g, "true")
        .replace(/False/g, "false");
      const devices = JSON.parse(json);
      devices.map((device) => updateDevice(device, device.uid));
    };

    devicesSSE.addEventListener("update", updateHandler);

    return () => {
      devicesSSE.close();
    };
  }, [initialized, devices, listenerURL]);

  return null;
}
