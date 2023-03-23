import React from "react";

import ContextMenu from "../ContextMenu";
import colors from "../../../configs/colors";

export default function DivisionDetailsContextMenu({
  isContextMenuVisible,
  setIsContextMenuVisible,
}) {
  return (
    <>
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
            name: "Change Icon",
            icon: "image",
            color: colors.primaryText,
            callback: () => console.log("TODO: Change Icon"),
          },
          {
            name: "Delete",
            icon: "trash-2",
            color: colors.red,
            callback: () => console.log("TODO: Delete"),
          },
        ]}
      />
    </>
  );
}
