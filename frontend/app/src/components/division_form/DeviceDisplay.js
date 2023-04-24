import { StyleSheet, Text, View, Image } from "react-native";
import utils from "../../utils/utils";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

import colors from "../../../configs/colors";

export default function DeviceDisplay({ device }) {
  const displaySelectButton = (included) => {
    return (
      <FontAwesome5Icon
        name="check-circle"
        size={16}
        color={included ? colors.active : colors.desactive}
        solid
      />
    );
  }
  
  return (
    <View style={styles.card} key={device.uid}>
      <Image
        style={styles.icon}
        source={utils.getDeviceIcon(device.subcategory)}
      />
      <View>
        <Text style={styles.name}>{device.name}</Text>
        <Text style={styles.divisions}>{device.divisions[0]}</Text>
      </View>
      {displaySelectButton(device.on)}
    </View>
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
