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

export default {
  getDevices,
};
