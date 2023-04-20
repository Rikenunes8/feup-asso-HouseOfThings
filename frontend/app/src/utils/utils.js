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
    case "bedroom-icon":
      return require("../../../assets/division_icons/bedroom-icon.png");
    case "kitchen-icon":
      return require("../../../assets/division_icons/kitchen-icon.png");
    default:
      return require("../../../assets/icon.png");
  }
}

export default {
  capitalize,
  removeDuplicates,
  showConfirmDialog,
  showErrorMessage,
  getDeviceIcon,
};
