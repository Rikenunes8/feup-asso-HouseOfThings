import React, { useContext } from "react";
import ContextMenu from "../../ContextMenu";
import DevicesContext from "../../../contexts/DevicesContext";

import colors from "../../../../configs/colors";
import api from "../../../api/api";
import utils from "../../../utils/utils";

export default function LightDetailsContextMenu({
  setIsDetailsModalVisible,
  isContextMenuVisible,
  setIsContextMenuVisible,
  deviceContextMenuUid,
}) {
  const { removeDevice } = useContext(DevicesContext);

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
            utils.showConfirmDialog(
              "Disconnect device", 
              "Are you sure you want to disconnect this device?" , () => { 
                console.log("Disconnecting device..."); 
                api.disconnectDevice(deviceContextMenuUid);
                setIsDetailsModalVisible(false); 
                setIsContextMenuVisible(false); 
                removeDevice(deviceContextMenuUid);
              }, () => { 
                console.log("Canceling disconnect..."); 
              }
            );
          },
        },
      ]}
    />
  );
}
