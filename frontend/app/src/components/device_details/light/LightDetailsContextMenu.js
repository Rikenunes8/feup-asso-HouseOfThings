import React from "react";
import ContextMenu from "../../ContextMenu";
import colors from "../../../../configs/colors";

export default function LightDetailsContextMenu({
  isContextMenuVisible,
  setIsContextMenuVisible,
}) {
  return (
    <ContextMenu
      isContextMenuVisible={isContextMenuVisible}
      setIsContextMenuVisible={setIsContextMenuVisible}
      options={[
        {
          name: "Rename",
          icon: "edit-2",
          color: colors.primaryText,
          callback: () => console.log("TODO: Rename"),
        },
        {
          name: "Disconnect",
          icon: "wifi-off",
          color: colors.red,
          callback: () => console.log("TODO: Disconnect"),
        },
      ]}
    />
  );
}
