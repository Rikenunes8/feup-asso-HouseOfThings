import { useEffect, useContext } from "react";
import EventSource from "react-native-event-source";

import DevicesContext from "../contexts/DevicesContext";
import api from "../api/api";

export default function SSEClient() {
  const { initialized, updateDevice } = useContext(DevicesContext);

  useEffect(() => {
    if (!initialized) return;

    console.log("SSE: Devices Listener...", api.devicesListenerURL);
    const devicesSSE = new EventSource(api.devicesListenerURL);

    devicesSSE.addEventListener("update", (event) => {
      console.log("SSE: devices update...");
      const json = event.data
        .replace(/'/g, '"')
        .replace(/True/g, "true")
        .replace(/False/g, "false");
      const devices = JSON.parse(json);
      devices.map((device) => updateDevice(device, device.uid));
    });

    return () => {
      devicesSSE.close();
    };
  }, [initialized]);

  return null;
}
