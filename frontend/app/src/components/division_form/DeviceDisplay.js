import { useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import utils from "../../utils/utils";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

import colors from "../../../configs/colors";
import AddDivisionContext from "../../contexts/AddDivisionContext";

export default function DeviceDisplay({ device }) {
  const { selectedDevices, setSelectedDevices } =
    useContext(AddDivisionContext);

  const included = selectedDevices.includes(device.uid);

  const displaySelectButton = (included) => {
    return (
      <FontAwesome5Icon
        name="check-circle"
        size={16}
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

  return (
    <TouchableOpacity
      key={device.uid}
      style={styles.card}
      onPress={() => addRemoveSelectedDevice(included, device.uid)}
    >
      <Image
        style={styles.icon}
        source={utils.getDeviceIcon(device.subcategory)}
      />
      <View>
        <Text style={styles.name}>{device.name}</Text>
        <Text style={styles.divisions}>{device.divisions[0]}</Text>
      </View>
      {displaySelectButton(included)}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 5,
    width: "48%",
    paddingVertical: 5,
    paddingHorizontal: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 40,
  },
  name: {
    fontWeight: 800,
  },
  divisions: {
    color: "grey",
    fontSize: 10,
  },
});
