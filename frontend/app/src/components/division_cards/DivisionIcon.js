import React from "react";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const fontAwesome5 = function (name, size, color) {
  return <FontAwesome5Icon name={name} size={size} color={color} />;
};

const icons = {
  "all-icon": { family: fontAwesome5, icon: "laptop-house" },
  "bedroom-icon": { family: fontAwesome5, icon: "bed" },
  "kitchen-icon": { family: fontAwesome5, icon: "utensils" },
};

export default function IconModal({ icon, size, color }) {
  return icons[icon].family(icons[icon].icon, size, color);
}
