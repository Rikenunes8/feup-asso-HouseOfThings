import { Alert } from "react-native";

const capitalize = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const removeDuplicates = (arr) => {
  return arr.filter((item, index) => arr.indexOf(item) === index);
};

const showConfirmDialog = (title, message, onConfirm, onCancel) => {
  return Alert.alert(title, message, [
    {
      text: "Confirm",
      onPress: () => {
        if ("function" === typeof onConfirm) onConfirm();
      },
    },
    {
      text: "Cancel",
      onPress: () => {
        if ("function" === typeof onCancel) onCancel();
      },
    },
  ]);
};

const showErrorMessage = (message) => {
  return Alert.alert(message);
};

function getDeviceIcon(subcategory) {
  switch (subcategory) {
    case "light bulb":
      return require("../../../assets/devices/light_bulb.png");
    case "thermometer":
      return require("../../../assets/devices/thermometer.png");
    default:
      return require("../../../assets/icon.png");
  }
}

function isTemperatureCold(temperature) {
  return temperature < 25;
}

export default {
  capitalize,
  removeDuplicates,
  showConfirmDialog,
  showErrorMessage,
  getDeviceIcon,
  isTemperatureCold,
};
