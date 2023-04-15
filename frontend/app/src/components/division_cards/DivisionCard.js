import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from "react-native";

import DynamicTextInput from "../form/DynamicTextInput";
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

  const [searchDeviceName, setSearchDeviceName] = useState(null);

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
          <View>
              <View style={styles.topSearch}>
                <Text style={styles.devicesText}>Devices</Text>
                <View style={styles.search}>
                  <TextInput 
                    style={styles.writeSearch}
                    value={searchDeviceName ?? ""}
                    onChangeText={setSearchDeviceName}
                  />
                  <Image source={require("../../../../assets/search.png")} />
                </View>
              </View>
          </View>
        }
      />

      <DivisionIcon icon={division.icon} size={30} color={colors.primaryText} />

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
  devicesText: {
    color: colors.primary,
    fontWeight: 700,
    fontSize: 18
  },
  topSearch: {
    paddingHorizontal: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    height: 30,
  },
  writeSearch: {
    padding: 0,
    borderBottomWidth: 1,
    minWidth: 125
  },
  search: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }
});
