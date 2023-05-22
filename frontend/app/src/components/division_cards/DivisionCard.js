import React, { useState, useContext, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

import DeviceDisplay from "../division_form/DeviceDisplay";
import DivisionDetailsContextMenu from "../division_details/DivisionDetailsContextMenu";
import IconModal from "../modal/IconModal";
import DivisionIcon from "./DivisionIcon";
import colors from "../../../configs/colors";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import DevicesContext from "../../contexts/DevicesContext";
import DivisionRenamingContextMenu from "../division_details/DivisionRenamingContextMenu";
import ModalsContext from "../../contexts/ModalsContext";
import AddDivisionContext from "../../contexts/AddDivisionContext";
import DivisionsContext from "../../contexts/DivisionsContext";
import DivisionChangingIconContextMenu from "../division_details/DivisionChangingIconContextMenu";

import api from "../../api/api";

export default function DivisionCard({
  division,
  onPress,
  allowLongPress,
  highlighted,
  onDelete = () => {},
}) {
  const { devices, setDevices } = useContext(DevicesContext);
  const { setDivisions } = useContext(DivisionsContext);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  const { selectedDevices, setSelectedDevices, resetAddDivisionContext } =
    useContext(AddDivisionContext);
  const {
    isMenuModalRenaming,
    isMenuModalChangeIcon,
    setIsMenuModalRenaming,
    setIsMenuModalChangeIcon,
  } = useContext(ModalsContext);

  const [divisionName, setDivisionName] = useState(division.name);
  const [divisionIcon, setDivisionIcon] = useState(division.icon);

  const [searchDeviceName, setSearchDeviceName] = useState(null);

  const refDivisionName = useRef(null);

  const renameCallback = (name) => {
    setDivisionName(name);
  };

  const changeIconCallback = (icon) => {
    setDivisionIcon(icon);
  };

  const resetDivisionName = () => {
    setDivisionName(division.name);
  };

  const resetDivisionIcon = () => {
    setDivisionIcon(division.icon);
  };

  const showDevices = () => {
    if (devices) {
      return devices.map((device) => (
        <DeviceDisplay key={device.name} device={device} />
      ));
    }
  };

  return (
    <TouchableOpacity
      style={
        highlighted
          ? [styles.divisionCard, styles.selectedDivisionCard]
          : styles.divisionCard
      }
      onPress={onPress}
      onLongPress={() => {
        if (!allowLongPress) return;
        setSelectedDevices(division.devices);
        setIsDetailsModalVisible(!isDetailsModalVisible);
      }}
    >
      <IconModal
        title={divisionName}
        titleEditable={isMenuModalRenaming}
        titleOnChangeCallback={renameCallback}
        titleRef={refDivisionName}
        subtitle={division.numDevices + " devices"}
        visible={isDetailsModalVisible}
        icon={divisionIcon}
        iconEditable={isMenuModalChangeIcon}
        iconOnChangeCallback={changeIconCallback}
        type="division"
        leftIcon="close"
        rightIcon="ellipsis1"
        leftIconCallback={async () => {
          toAdd = selectedDevices.filter((e) => !division.devices.includes(e));
          toRemove = division.devices.filter(
            (e) => !selectedDevices.includes(e)
          );
          for (const device of toAdd) {
            await api.addDivisionDevice(division.id, device);
          }
          for (const device of toRemove) {
            await api.removeDivisionDevice(division.id, device);
          }
          if (toAdd.length > 0 || toRemove.length > 0) {
            const updatedDivisions = await api.getDivisions();
            const updatedDevices = await api.getDevices();
            setDivisions(updatedDivisions);
            setDevices(updatedDevices);
          }
          resetAddDivisionContext();
          setIsDetailsModalVisible(false);
          setIsContextMenuVisible(false);
          setIsMenuModalRenaming(false);
          setIsMenuModalChangeIcon(false);
          resetDivisionName();
          resetDivisionIcon();
        }}
        rightIconCallback={() => setIsContextMenuVisible(!isContextMenuVisible)}
        contextMenu={
          isMenuModalRenaming ? (
            <DivisionRenamingContextMenu
              isContextMenuVisible={isContextMenuVisible}
              setIsContextMenuVisible={setIsContextMenuVisible}
              divisionContextMenuId={division.id}
              divisionContextMenuName={divisionName}
              resetDivisionContextMenuName={resetDivisionName}
            />
          ) : isMenuModalChangeIcon ? (
            <DivisionChangingIconContextMenu
              isContextMenuVisible={isContextMenuVisible}
              setIsContextMenuVisible={setIsContextMenuVisible}
              divisionContextMenuId={division.id}
              divisionContextMenuIcon={divisionIcon}
              resetDivisionContextMenuIcon={resetDivisionIcon}
            />
          ) : (
            <DivisionDetailsContextMenu
              setIsDetailsModalVisible={setIsDetailsModalVisible}
              isContextMenuVisible={isContextMenuVisible}
              setIsContextMenuVisible={setIsContextMenuVisible}
              divisionContextMenuId={division.id}
              onDivisionDelete={onDelete}
            />
          )
        }
        modalContent={
          <View>
            <View style={styles.topSearch}>
              <Text style={styles.devicesText}>Devices</Text>
            </View>

            <View style={styles.devices}>{showDevices()}</View>
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
    fontSize: 18,
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
    minWidth: 125,
  },
  search: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  devices: {
    marginTop: 20,
    paddingHorizontal: 5,
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
  },
  divisionIcon: {
    marginVertical: 5,
  },
});
