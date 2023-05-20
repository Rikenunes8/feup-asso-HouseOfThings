import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";

export default {
  ip: REACT_APP_SERVER_IP || "192.168.0.20",
  port: REACT_APP_SERVER_PORT || 5000,
};
