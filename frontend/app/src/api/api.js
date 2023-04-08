import apiClient from "./client";

const getDivisions = async () => {
  try {
    const response = await apiClient.get("/divisions");
    return response.data.divisions;
  } catch (error) {
    console.error(error);
    return [
      { name: "Family Room", icon: "bedroom-icon", numDevices: 1 },
      { name: "Tiago Room", icon: "bedroom-icon", numDevices: 1 },
      { name: "Kitchen", icon: "kitchen-icon", numDevices: 0 },
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

export default {
  getDevices,
  getCategories,
  getDivisions,
  addDevice,
  disconnectDevice,
  actionDevice,
  renameDevice,
  availableDevices,
  getRules,
};
