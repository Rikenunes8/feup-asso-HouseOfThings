import { useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import utils from "../../utils/utils";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

import AddDivisionContext from "../../contexts/AddDivisionContext";
import DivisionsContext from "../../contexts/DivisionsContext";
import colors from "../../../configs/colors";

export default function DeviceDisplay({ device }) {
  const { selectedDevices, setSelectedDevices } =
    useContext(AddDivisionContext);
  const { getDivision } = useContext(DivisionsContext);

  const included = selectedDevices.includes(device.uid);

  const displaySelectButton = (included) => {
    return (
      <FontAwesome5Icon
        name="check-circle"
        size={15}
        color={included ? colors.active : colors.desactive}
        solid
      />
    );
  };

  const addRemoveSelectedDevice = (included, uid) => {
    if (included) {
      setSelectedDevices(selectedDevices.filter((id) => id != uid));
    } else {
      setSelectedDevices([...selectedDevices, uid]);
    }
  };

  const getDeviceDivisions = () => {
    const deviceDivisions = [];
    device.divisions.map((divisionId) => {
      const division = getDivision(divisionId);
      if (division) deviceDivisions.push(division.name);
    });
    return deviceDivisions.join(", ");
  };

  return (
    <TouchableOpacity
      key={device.uid}
      style={styles.card}
      onPress={() => addRemoveSelectedDevice(included, device.uid)}
    >
      <View style={styles.info}>
        <Image
          style={styles.icon}
          source={utils.getDeviceIcon(device.subcategory)}
        />
        <View>
          <Text style={styles.name}>{device.name}</Text>
          <Text style={styles.details} numberOfLines={1} ellipsizeMode="tail">
            {getDeviceDivisions()}
          </Text>
        </View>
      </View>

      {displaySelectButton(included)}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  info: {
    flex: 0.7,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5,
  },
  icon: {
    width: 35,
    height: 35,
    objectFit: "contain",
    marginRight: 5,
  },
  name: {
    fontWeight: 800,
  },
  details: {
    color: "grey",
    fontSize: 10,
  },
});
