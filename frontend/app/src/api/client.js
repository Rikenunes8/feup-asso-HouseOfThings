import axios from "axios";
import server from "../../configs/server";

export default axios.create({
  baseURL: "http://" + server.ip + ":" + server.port,
});
