import React, { useState, useContext } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

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

  const [isLoading, setIsLoading] = useState(false);

  const disconnectCallback = () => {
    utils.showConfirmDialog(
      "Disconnect device",
      "Are you sure you want to disconnect this device?",
      () => {
        console.log("Disconnecting device...");
        setIsLoading(true);

        api.disconnectDevice(deviceContextMenuUid).then((success) => {
          setIsLoading(false);
          setIsContextMenuVisible(false);

          if (success) {
            console.log("Device disconnected successfully");
            setIsDetailsModalVisible(false);
            removeDevice(deviceContextMenuUid);
            return;
          }

          console.log("Failed to disconnect device");
          utils.showErrorMessage("Failed to disconnect device");
        });
      },
      () => {
        console.log("Canceling disconnect...");
      }
    );
  };

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
            name: "Disconnect",
            icon: "wifi-off",
            color: colors.red,
            callback: disconnectCallback,
          },
        ]}
      />

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.white} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  // TODO: better position loading indicator so it
  // covers the entire screen!
  loadingContainer: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
  },
});
