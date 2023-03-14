import { Alert } from "react-native";

const showConfirmDialog = (title, message, onConfirm, onCancel) => {
  return Alert.alert(
    title,
    message,
    [
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
        }
      },
    ]
  );
}

const showErrorMessage = (message) => {
  return Alert.alert(message);
}


export default {
  showConfirmDialog,
  showErrorMessage,
};
