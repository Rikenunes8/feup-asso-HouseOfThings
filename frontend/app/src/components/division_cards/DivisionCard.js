import React, { useState, useContext, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";

import DeviceDisplay from "../division_form/DeviceDisplay";
import DivisionDetailsContextMenu from "../division_details/DivisionDetailsContextMenu";
import IconModal from "../modal/IconModal";
import DivisionIcon from "./DivisionIcon";
import colors from "../../../configs/colors";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import DevicesContext from "../../contexts/DevicesContext";
import DivisionRenamingContextMenu from "../division_details/DivisionRenamingContextMenu";
import ModalsContext from "../../contexts/ModalsContext";

export default function DivisionCard({
  division,
  onPress,
  allowLongPress,
  highlighted,
}) {
  const { devices } = useContext(DevicesContext);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  const { isMenuModalRenaming, setIsMenuModalRenaming } = useContext(ModalsContext)

  const [divisionName, setDivisionName] = useState(division.name);

  const [searchDeviceName, setSearchDeviceName] = useState(null);

  const refDivisionName = useRef(null);

  const renameCallback = (name) => {
    setDivisionName(name);
  };

  const resetDivisionName = () => {
    setDivisionName(division.name);
  };

  const showDevices = () => {
    if (devices) {
      return devices.map((device) => (
        <DeviceDisplay key={device.name} device={device} />
      ))
    }
  }

  console.log("Division: ", division.id)

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
      {/* TODO icon=division.icon*/}
      <IconModal
        title={divisionName}
        titleEditable={isMenuModalRenaming}
        titleOnChangeCallback={renameCallback}
        titleRef={refDivisionName}
        subtitle={division.numDevices + " devices"}
        visible={isDetailsModalVisible}
        icon={division.icon}
        type="division" 
        leftIcon="close"
        rightIcon="ellipsis1"
        leftIconCallback={() => {
          setIsDetailsModalVisible(false);
          setIsContextMenuVisible(false);
          setIsMenuModalRenaming(false);
          resetDivisionName();
        }}
        rightIconCallback={() => setIsContextMenuVisible(!isContextMenuVisible)}
        contextMenu={
          isMenuModalRenaming ? (
            <DivisionRenamingContextMenu
              isContextMenuVisible={isContextMenuVisible}
              setIsContextMenuVisible={setIsContextMenuVisible}
              divisionContextMenuUid={1} //TODO: Get division id
              divisionContextMenuName={division.name}
              resetDivisionContextMenuName={resetDivisionName}
            />
          ) : (
            <DivisionDetailsContextMenu
              isContextMenuVisible={isContextMenuVisible}
              setIsContextMenuVisible={setIsContextMenuVisible}
            />
          )
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
                  <FontAwesome5Icon name="search" size={15} color={colors.primary} />
                </View>
              </View>

              <View style={styles.devices}>
                {showDevices()}
              </View>

          </View>
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
  },
  devices: {
    marginTop: 20,
    paddingHorizontal: 5,
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap"
  },
  divisionIcon: {
    marginVertical: 5,
  },
});
