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

export default {
  capitalize,
  removeDuplicates,
  showConfirmDialog,
  showErrorMessage,
};
