import { Alert, Image, StyleSheet } from "react-native";
import DivisionIcon from "../components/division_cards/DivisionIcon";
import colors from "../../configs/colors"

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
    case "light bulb rgb":
      return require("../../../assets/devices/light_bulb_rgb.png");
    case "thermometer":
      return require("../../../assets/devices/thermometer.png");
    default:
      return require("../../../assets/icon.png");
  }
}

function getDeviceImg(src) {
  return <Image style={styles.detailsIcon} source={src} />
}

function getDivisionImg(src) {
  return <DivisionIcon
    icon={src}
    size={135}
    color={colors.white}
  />
}

export default {
  capitalize,
  removeDuplicates,
  showConfirmDialog,
  showErrorMessage,
  getDeviceIcon,
  getDeviceImg,
  getDivisionImg
};

const styles = StyleSheet.create({
  detailsIcon: {
    width: 180, // TODO: make this relative to the screen size ??
    height: 180, // TODO: make this relative to the screen size ??
    resizeMode: "contain",
    alignSelf: "flex-end",
  }
});
