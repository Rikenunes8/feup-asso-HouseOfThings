import apiClient from "./client";

const getDevices = async () => {
  try {
    const response = await apiClient.get("/devices");
    return response.data.devices;
  } catch (error) {
    console.error(error);
    return [
      { name: "Philips Bulb", divisions: ["Family Room"], enabled: true },
      { name: "Philips Bulb", divisions: ["Tiago Room"], enabled: false },
    ];
  }
};

const getCategories = async () => {
  try {
    const response = await apiClient.get("/categories");
    return response.data.categories;
  } catch (error) {
    console.error(error);
    return [
      {
        name: "light",
        subcategories: ["light1"],
      },
    ];
  }
};

const addDevice = async (id, device) => {
  try {
    const response = await apiClient.post(`/devices/${id}/connect`, device);
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

const renameDevice = async (id, name) => {
  try {
    const response = await apiClient.post(`/devices/${id}/rename`, {
      name: name,
    });
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

const availableDevices = async (body) => {
  try {
    const response = await apiClient.get("/devices/available", {
      params: { ...body },
    });
    return response.data.devices;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default {
  getDevices,
  getCategories,
  addDevice,
  disconnectDevice,
  actionDevice,
  renameDevice,
  availableDevices,
};
