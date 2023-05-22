import apiClient from "./client";

const devicesListenerURL = apiClient.defaults.baseURL + "/devices/listener";

const getDivisions = async () => {
  try {
    const response = await apiClient.get("/divisions");
    return response.data.divisions;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getDevices = async () => {
  try {
    const response = await apiClient.get("/devices");
    return response.data.devices;
  } catch (error) {
    console.error(error);
    return [];
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

const getRules = async () => {
  try {
    const response = await apiClient.get("/rules");
    return response.data.rules;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getLogs = async () => {
  try {
    const response = await apiClient.get("/logs");
    return response.data.logs;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const addRule = async (rule) => {
  try {
    const response = await apiClient.post(`/rules`, rule);
    if (response.data.error) throw new Error(response.data.error);
    if (response.data.rule == null) throw new Error("No rule returned");
    return response.data.rule;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const addDivision = async (division) => {
  try {
    const response = await apiClient.post(`/divisions`, division);
    if (response.data.error) throw new Error(response.data.error);
    if (response.data.division == null) throw new Error("No division returned");
    return response.data.division;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const deleteDivision = async (id) => {
  try {
    const response = await apiClient.delete(`/divisions/${id}`);
    if (response.data.error) throw new Error(response.data.error);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const addDivisionDevice = async (id, deviceId) => {
  try {
    const response = await apiClient.post(`/divisions/${id}/add-device`, {
      device: deviceId,
    });
    if (response.data.error) throw new Error(response.data.error);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const removeDivisionDevice = async (id, deviceId) => {
  try {
    const response = await apiClient.post(`/divisions/${id}/remove-device`, {
      device: deviceId,
    });
    if (response.data.error) throw new Error(response.data.error);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const renameDivision = async (id, name) => {
  try {
    const response = await apiClient.post(`/divisions/${id}/rename`, {
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

const changeDivisionIcon = async (id, icon) => {
  try {
    const response = await apiClient.post(`/divisions/${id}/change-icon`, {
      icon: icon,
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

const addDevice = async (id, device) => {
  try {
    const response = await apiClient.post(`/devices/${id}/connect`, device);
    if (response.data.error) throw new Error(response.data.error);
    if (response.data.device == null) throw new Error("No device returned");
    return response.data.device;
  } catch (error) {
    console.error(error);
    return null;
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

    if (response.data.error) throw Error(response.data.error);
    return response.data.device;
  } catch (error) {
    console.error(error);
  }
};

const actionSetColorDevice = async (id, color) => {
  return await actionDevice(id, {
    action: "set_color",
    data: { color: color },
  });
};

const actionSetBrightnessDevice = async (id, brightness) => {
  return await actionDevice(id, {
    action: "set_brightness",
    data: { brightness: brightness },
  });
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

const executeRule = async (id) => {
  try {
    const response = await apiClient.post(`/rules/${id}/execute`);
    if (response.data.error) throw Error(response.data.error);
    return response.data.devices;
  } catch (error) {
    console.error(error);
  }
};

export default {
  devicesListenerURL,
  getDevices,
  getCategories,
  getDivisions,
  getRules,
  getLogs,
  addDivision,
  addDevice,
  addRule,
  disconnectDevice,
  actionDevice,
  actionSetColorDevice,
  actionSetBrightnessDevice,
  renameDevice,
  availableDevices,
  executeRule,
  deleteDivision,
  renameDivision,
  changeDivisionIcon,
  addDivisionDevice,
  removeDivisionDevice,
};
