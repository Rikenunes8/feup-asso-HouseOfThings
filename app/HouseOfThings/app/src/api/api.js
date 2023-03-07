import apiClient from "./client";

const getDevices = async () => {
  try {
    const response = await apiClient.get("/devices");
    return response.data.devices;
  } catch (error) {
    console.error(error);
    return [
      { name: "Philips Bulb", division: "Family Room", enabled: true },
      { name: "Philips Bulb", division: "Tiago Room", enabled: false },
    ];
  }
};

const addDevice = async () => {
  try {
    const response = await apiClient.post("/devices/1/connect?type=light&protocol=mqtt");
    if (response.data.error) {
      console.error(response.data.error);
    }
  } catch (error) {
    console.error(error);
  }
}


export default {
  getDevices,
  addDevice,
};
