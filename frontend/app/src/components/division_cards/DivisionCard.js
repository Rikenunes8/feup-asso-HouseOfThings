import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import DivisionDetailsContextMenu from "../division_details/DivisionDetailsContextMenu";
import IconModal from "../modal/IconModal";
import DivisionIcon from "./DivisionIcon";
import colors from "../../../configs/colors";

export default function DivisionCard({
  division,
  onPress,
  allowLongPress,
  highlighted,
}) {
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  return (
    <TouchableOpacity
      style={
        highlighted
          ? [styles.divisionCard, styles.selectedDivisionCard]
          : styles.divisionCard
      }
      onPress={onPress}
      onLongPress={() =>
        allowLongPress && setIsDetailsModalVisible(!isDetailsModalVisible)
      }
    >
      <IconModal
        title={division.name}
        subtitle={division.numDevices + " devices"}
        visible={isDetailsModalVisible}
        leftIcon="close"
        rightIcon="ellipsis1"
        leftIconCallback={() => {
          setIsDetailsModalVisible(false);
          setIsContextMenuVisible(false);
        }}
        rightIconCallback={() => setIsContextMenuVisible(!isContextMenuVisible)}
        contextMenu={
          <DivisionDetailsContextMenu
            isContextMenuVisible={isContextMenuVisible}
            setIsContextMenuVisible={setIsContextMenuVisible}
          />
        }
        modalContent={
          // TODO
          <View></View>
        }
      />

      <View style={styles.divisionIcon}>
        <DivisionIcon
          icon={division.icon}
          size={25}
          color={colors.primaryText}
        />
      </View>
      <Text style={styles.divisionName}>{division.name}</Text>
      <Text style={styles.divisionText}>
        {division.numDevices} {division.numDevices == 1 ? "device" : "devices"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  divisionCard: {
    width: 130,
    marginRight: 15,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 15,
    marginVertical: 10,
    padding: 10,
  },
  selectedDivisionCard: {
    backgroundColor: colors.transparentPrimary,
  },
  divisionName: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.primaryText,
    textAlign: "center",
  },
  divisionText: {
    color: colors.secondaryText,
    textAlign: "center",
  },
  divisionIcon: {
    marginVertical: 5,
  },
});
