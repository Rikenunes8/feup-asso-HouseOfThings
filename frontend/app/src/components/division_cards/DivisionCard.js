import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";

import DeviceDisplay from "../division_form/DeviceDisplay";
import DivisionDetailsContextMenu from "../division_details/DivisionDetailsContextMenu";
import IconModal from "../modal/IconModal";
import DivisionIcon from "./DivisionIcon";
import colors from "../../../configs/colors";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";


export default function DivisionCard({
  division,
  onPress,
  allowLongPress,
  highlighted,
}) {
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  const [searchDeviceName, setSearchDeviceName] = useState(null);

  const showDevices = () => {
    //TODO: Remove hardcoded devices
    let devices = [
      {name: "Philips Bulb", divisions: ["Family Room"], subcategory: "light bulb", on: true},
      {name: "Philips Bulb 2", divisions: ["Tiago Room"], subcategory: "light bulb", on: false},
      {name: "Philips Bulb 3", divisions: ["Tiago Room"], subcategory: "light bulb", on: true}
    ]
    if (devices) {
      return devices.map((device) => (
        <DeviceDisplay key={device.name} device={device} />
      ))
    }
  }

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
        title={division.name}
        subtitle={division.numDevices + " devices"}
        visible={isDetailsModalVisible}
        icon={require("../../../../assets/icon.png")} 
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
