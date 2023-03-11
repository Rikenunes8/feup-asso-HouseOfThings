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

const addDevice = async (id) => {
  try {
    const response = await apiClient.post(`/devices/${id}/connect`, {
      group: "light",
    }); // TODO extract hardcoded
    if (response.data.error) {
      console.error(response.data.error);
    }
  } catch (error) {
    console.error(error);
  }
};

const disconnectDevice = async (id) => {
  try {
    const response = await apiClient.post(`/devices/${id}/disconnect`);
    if (response.data.error) {
      console.error(response.data.error);
    }
  } catch (error) {
    console.error(error);
  }
};

const actionDevice = async (id, action) => {
  try {
    const response = await apiClient.post(`/devices/${id}/action`, {
      ...action,
    });
    if (response.data.error) {
      console.error(response.data.error);
    }
  } catch (error) {
    console.error(error);
  }
};

export default {
  getDevices,
  addDevice,
  disconnectDevice,
  actionDevice,
};
