import React, { useEffect } from "react";
import EventSource from "react-native-sse";
import api from "../../api/api";

export default function DevicesListener({ children }) {
  useEffect(() => {
    console.log("DevicesListener mounted.");
    console.log("api.devicesListenerURL:", api.devicesListenerURL);

    const sse = new EventSource(api.devicesListenerURL);
    console.log("sse:", sse);

    // TODO: fix this!!!
    sse.onmessage((e) => {
      console.log("sse.onMessage(e):", e);
    });

    return () => {
      sse.close();
    };
  }, []);

  return <>{children}</>;
}
