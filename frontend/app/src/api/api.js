import apiClient from "./client";

const devicesListenerURL = apiClient.defaults.baseURL + "/devices/listener";

const getDivisions = async () => {
  try {
    const response = await apiClient.get("/divisions");
    return response.data.divisions;
  } catch (error) {
    console.error(error);
    return [
      { id: 0, name: "Family Room", icon: "bedroom-icon", numDevices: 1 },
      { id: 1, name: "Tiago Room", icon: "bedroom-icon", numDevices: 1 },
      { id: 2, name: "Kitchen", icon: "kitchen-icon", numDevices: 0 },
    ];
  }
};

const getDevices = async () => {
  try {
    const response = await apiClient.get("/devices");
    return response.data.devices;
  } catch (error) {
    console.error(error);
    return [
      {
        name: "Simple light",
        divisions: ["Family Room"],
        category: "light",
        subcategory: "light bulb",
        power: "true",
        uid: 0,
      },
      {
        name: "RGB light",
        divisions: ["Family Room"],
        category: "light",
        subcategory: "light bulb rgb",
        power: "false",
        color: "#222222",
        brightness: 100,
        uid: 1,
      },
      {
        name: "Thermometer",
        divisions: ["Family Room"],
        category: "thermometer",
        subcategory: "thermometer",
        temperature: 25,
        uid: 2,
      },
    ];
  }
};

const getRules = async () => {
  try {
    const response = await apiClient.get("/rules");
    return response.data.rules;
  } catch (error) {
    console.error(error);
    return [
      {
        id: 1,
        name: "Family Room Lights Off",
        operation: "and",
        when: [],
        then: [
          {
            device_id: 1,
            action: "turn_off",
          },
        ],
      },
      {
        id: 2,
        name: "Lights Off at Night",
        operation: "or",
        when: [
          {
            kind: "schedule",
            time: "22:30",
            days: [1, 2, 3, 4, 5, 6, 7],
          },
        ],
        then: [
          {
            device_id: 1,
            action: "turn_off",
          },
          {
            device_id: 2,
            action: "turn_off",
          },
        ],
      },
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

const updateRule = async (id, rule) => {
  try {
    const response = await apiClient.post(`/rules/${id}/`, rule);
    if (response.data.error) throw Error(response.data.error);
    return response.data.rule;
  } catch (error) {
    console.error(error);
  }
};

const deleteRule = async (id) => {
  try {
    const response = await apiClient.delete(`/rules/${id}`);
    if (response.data.error) throw Error(response.data.error);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default {
  devicesListenerURL,
  getDevices,
  getCategories,
  getDivisions,
  getRules,
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
  updateRule,
  deleteRule,
  deleteDivision,
  renameDivision,
  changeDivisionIcon,
  addDivisionDevice,
  removeDivisionDevice,
};
