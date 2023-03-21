import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  Image,
  TouchableOpacity,
} from "react-native";

// import DetailsModal from "./DetailsModal";
// import LightDetails from "./division_details/light/LightDetails.js";
// import LightDetailsContextMenu from "./division_details/light/LightDetailsContextMenu";
import DivisionsContext from "../contexts/DivisionsContext";

// import api from "../api/api";
import colors from "../../configs/colors";

export default function DivisionCard({ division }) {
  const { updateDivision } = useContext(DivisionsContext);

//   const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
//   const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

//   onOfHandler = (isEnabled) => {
//     console.log(`Turning ${isEnabled ? "off" : "on"} division...`);

//     const action = isEnabled ? "turnOff" : "turnOn";
//     api.actionDivision(division.uid, { action: action });
//     updateDivision({ on: !division.on }, division.uid);
//   };

  return (
    <TouchableOpacity
      style={styles.divisionCard}
      onPress={() => setIsDetailsModalVisible(!isDetailsModalVisible)}
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

      <Image
        style={styles.divisionIcon}
        source={require("../../../assets/lightbulb.png")} //TODO: Change this to a dynamic image
      />

      <View style={{ justifyContent: "center" }}>
        <Text style={styles.divisionName}>{division.name}</Text>
        <Text style={styles.divisionText}>
          {division.numDevices} devices
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  divisionCard: {
    width: "40%",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 15,
    marginVertical: 10,
    padding: 10,
  },
  divisionIcon: {
    width: 50,
    height: 50,
    objectFit: "contain",
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
