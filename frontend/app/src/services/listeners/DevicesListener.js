import React, { useEffect } from "react";
import EventSource from "react-native-sse";
import api from "../../api/api";

export default function DevicesListener({ children }) {
  useEffect(() => {
    const sse = new EventSource(api.devicesListenerURL);

    const listener = (event) => {
      if (event.type === "open") {
        console.log("Open SSE connection.");
      } else if (event.type === "message") {
        // TODO: Update devices context accordingly with event.data
        console.log("Message:", event.data);
      } else if (event.type === "error") {
        console.error("Connection error:", event.message);
      } else if (event.type === "exception") {
        console.error("Error:", event.message, event.error);
      }
    };

    sse.addEventListener("open", listener);
    sse.addEventListener("message", listener);
    sse.addEventListener("error", listener);

    return () => {
      sse.removeAllEventListeners();
      sse.close();
    };
  }, []);

  return <>{children}</>;
}
