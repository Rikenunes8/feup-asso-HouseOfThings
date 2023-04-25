import React from "react";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const fontAwesome5 = function (name, size, color) {
  return <FontAwesome5Icon name={name} size={size} color={color} />;
};

export const icons = {
  "baby-icon": { family: fontAwesome5, icon: "baby" },
  "bath-icon": { family: fontAwesome5, icon: "bath" },
  "bedroom-icon": { family: fontAwesome5, icon: "bed" },
  "building-icon": { family: fontAwesome5, icon: "building" },
  "church-icon": { family: fontAwesome5, icon: "church" },
  "folder-icon": { family: fontAwesome5, icon: "folder" },
  "heart-icon": { family: fontAwesome5, icon: "heart" },
  "hospital-icon": { family: fontAwesome5, icon: "hospital" },
  "igloo-icon": { family: fontAwesome5, icon: "igloo" },
  "kitchen-icon": { family: fontAwesome5, icon: "utensils" },
  "living-room-icon": { family: fontAwesome5, icon: "couch" },
  "light-icon": { family: fontAwesome5, icon: "lightbulb" },
  "power-icon": { family: fontAwesome5, icon: "power-off" },
};

const _icons = {
  "all-icon": { family: fontAwesome5, icon: "laptop-house" },
  ...icons,
};

export default function IconModal({ icon, size, color }) {
  return _icons[icon].family(_icons[icon].icon, size, color);
}
