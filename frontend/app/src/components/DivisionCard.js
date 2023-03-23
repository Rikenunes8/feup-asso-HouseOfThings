import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import colors from "../../configs/colors";

export default function DivisionCard({ division, onPress, highlighted }) {
  return (
    <TouchableOpacity
      style={highlighted? [styles.divisionCard, styles.selectedDivisionCard] : styles.divisionCard}
      onPress={onPress}
      // onLongPress={() => setIsDetailsModalVisible(!isDetailsModalVisible)}
    >
      {/* <DetailsModal
        title={division.name || "Philips Bulb"}
        subtitle={division.division || "Living Room"}
        modalVisible={isDetailsModalVisible}
        leftIcon="close"
        rightIcon="ellipsis1"
        leftIconCallback={() => {setIsDetailsModalVisible(false); setIsContextMenuVisible(false)}}
        rightIconCallback={() => setIsContextMenuVisible(!isContextMenuVisible)}
        contextMenu={
          // TODO: Change this to a dynamic component (depending on division type)
          <LightDetailsContextMenu
            setIsDetailsModalVisible={setIsDetailsModalVisible}
            isContextMenuVisible={isContextMenuVisible}
            setIsContextMenuVisible={setIsContextMenuVisible}
            divisionContextMenuUid={division.uid}
          />
        }
        modalContent={
          // TODO: Change this to a dynamic component (depending on division type)
          <LightDetails on={division.on} handler={onOfHandler} />
        } 
      /> */}

      <Icon name={"bed"} size={30} color={colors.primaryText} />

      <Text style={styles.divisionName}>{division.name}</Text>
      <Text style={styles.divisionText}>
        {division.numDevices} {division.numDevices == 1? "device" : "devices"}
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
    backgroundColor: colors.transparentPrimary, // TODO change this color?
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
});
