import apiClient from "./client";

const getDevices = async () => {
  try {
    const response = await apiClient.get("/devices");
    return response.data.devices;
  } catch (error) {
    console.error(error);
    return [
      { name: "Philips Bulb", type: "light", division: "Family Room", enabled: true },
      { name: "Philips Bulb", type: "light", division: "Tiago Room", enabled: false },
    ];
  }
};

const getCategories = async () => {
  try {
    const response = await apiClient.get("/categories");
    return response.data.categories;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const addDevice = async (id) => {
  try {
    const response = await apiClient.post(`/devices/${id}/connect`, {
      group: "light",
    }); // TODO extract hardcoded
    if (response.data.error) {
      console.error(response.data.error);
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const disconnectDevice = async (id) => {
  try {
    const response = await apiClient.post(`/devices/${id}/disconnect`);
    if (response.data.error) {
      console.error(response.data.error);
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
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
  getCategories,
  addDevice,
  disconnectDevice,
  actionDevice,
};
