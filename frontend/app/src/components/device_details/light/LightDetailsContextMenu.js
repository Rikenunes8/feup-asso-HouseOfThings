import React from "react";
import ContextMenu from "../../ContextMenu";
import colors from "../../../../configs/colors";

import api from "../../../api/api";

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
          callback: () => {
            console.log("Disconnecting device...");
            api.disconnectDevice("1"); // TODO: Change this hardecoded 1
          },
        },
      ]}
    />
  );
}
