import React, { useState } from "react";
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import ContextMenu from "../ContextMenu";

import colors from "../../../configs/colors";

export default function DivisionDetailsContextMenu({
  setIsDetailsModalVisible,
  isContextMenuVisible,
  setIsContextMenuVisible,
  divisionContextMenuUid,
}) {
  const [isLoading, setIsLoading] = useState(false);

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

      {isLoading && 
        <View style={styles.loadingContainer} >
          <ActivityIndicator size="large" color={colors.white} />
        </View>
      }
    </>
  );
}

const styles = StyleSheet.create({
  // TODO: better position loading indicator so it 
  // covers the entire screen!
  loadingContainer: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
