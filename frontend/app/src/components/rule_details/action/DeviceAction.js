import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import colors from "../../../../configs/colors";

export default function DeviceAction({ device, actions }) {
  //put set_color at the end of the array
  actions.sort((a, b) => {
    if (Object.keys(a)[0] === "set_color") return 1;
    if (Object.keys(b)[0] === "set_color") return -1;
    return 0;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{device.name}</Text>

      <View style={styles.specs}>
        {actions.map((action, index) => {
          const [key, data] = Object.entries(action)[0];

          return (
            <View style={styles.row} key={index}>
              {key === "turn_on" && (
                <React.Fragment>
                  <Icon name="power" size={15} color={colors.primaryText} />
                  <Text style={styles.text}> on</Text>
                </React.Fragment>
              )}

              {key === "turn_off" && (
                <React.Fragment>
                  <Icon name="power" size={15} color={colors.primaryText} />
                  <Text style={styles.text}> off</Text>
                </React.Fragment>
              )}

              {key === "set_brightness" && (
                <React.Fragment>
                  <Icon name="sun" size={17} color={colors.primaryText} />
                  <Text style={styles.text}> {data.brightness}</Text>
                </React.Fragment>
              )}

              {key === "set_color" && (
                <React.Fragment>
                  <Icon
                    style={styles.set_color}
                    name="droplet"
                    size={15}
                    color={colors.primaryText}
                  />
                  <FontAwesomeIcon name="circle" size={15} color={data.color} />
                </React.Fragment>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    flexWrap: "wrap",
    gap: 10,
  },
  name: {
    fontWeight: "bold",
    color: colors.primaryText,
    marginRight: 15,
  },
  specs: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  set_color: {
    marginRight: 4,
  },
});
