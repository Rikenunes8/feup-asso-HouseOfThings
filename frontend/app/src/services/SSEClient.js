import { useEffect } from "react";
import EventSource from "react-native-event-source";

import api from "../api/api";

export default function SSEClient() {
  useEffect(() => {
    console.log("SSE: Devices Listener...", api.devicesListenerURL);

    const devicesSSE = new EventSource(api.devicesListenerURL);

    // NOTE: accoding to the event type expected we send in the backend to that message
    devicesSSE.addEventListener("test", (event) => {
      console.log("devicesSSE (test event):", event.data);
      // TODO(NEXT): update the devices context accordingly to the event data received
    });

    return () => {
      devicesSSE.close();
    };
  }, []);

  return null;
}
