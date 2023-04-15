import {
    StyleSheet,
    Text,
    View,
    Image
  } from "react-native";
  import utils from "../../utils/utils";
  
  export default function DeviceDisplay({device}) {
  
    return (
      <View style={styles.card} key={device.name + device.divisions[0]}>
        <Image style={styles.icon} source={utils.getDeviceIcon(device.subcategory)} />
        <View>
          <Text style={styles.name}>{device.name}</Text>
          <Text style={styles.divisions}>{device.divisions[0]}</Text>
        </View>
        {displayOnOff(device.on)}
      </View>
    );
  }
  
  function displayOnOff(power) {
    if (power)
      return <Image source={require("../../../../assets/green-check.png")} />
    else
    return <Image source={require("../../../../assets/red-check.png")} />
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
      marginBottom: 10
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
      fontSize: 10
    }
  });