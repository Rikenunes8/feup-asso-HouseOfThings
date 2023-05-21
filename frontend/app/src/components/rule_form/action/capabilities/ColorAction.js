import React, { useState, useContext } from "react";
import ColorPicker from "../../../form/ColorPicker";
import CreateRuleContext from "../../../../contexts/CreateRuleContext";
import colors from "../../../../../configs/colors";

export default function ColorAction({ index, action }) {
  const { updateRuleAction } = useContext(CreateRuleContext);

  const [selectedColor, setSelectedColor] = useState(action.color ?? colors.purple);

  const handleColorChange = (item) => {
    setSelectedColor(item);
    updateRuleAction(index, "set_color", { color: item });
  };

  return (
    <ColorPicker
      selectedColor={selectedColor}
      setSelectedColor={handleColorChange}
    />
  );
}
