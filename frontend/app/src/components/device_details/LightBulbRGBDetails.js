import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { ColorPicker, toHsv, fromHsv } from "react-native-color-picker";

import Icon from "react-native-vector-icons/SimpleLineIcons";
import colors from "../../../configs/colors";

export default function LightBulbRGBDetails({
  power,
  color, // in hex format
  brightness,
  handler,
}) {
  const stateText = power ? "On" : "Off";

  const [disabled, setDisabled] = React.useState(false);
  const [pickerColor, setPickerColor] = useState(toHsv(color));

  // TODO: pode-se mudar a cor e brigtness mesmo com ela desligada??

  const onPickerColorChange = (color) => {
    console.log(`Color changed: ${fromHsv(color)}`);
    setPickerColor(color);
    // apos x tempo sem change -> fazer o handle de cahnge da cor ao server
  };

  const onPickerColorSelected = (_) => {
    // equivale a tocar no botao do meio para ligar e ou desligar
    handler(power, setDisabled);
  };

  return (
    <View style={styles().container}>
      <View style={styles().detailsView}>
        <Text style={styles().lightText}>Light: </Text>
        <Text style={styles(power, fromHsv(pickerColor)).stateText}>
          {stateText}
        </Text>
      </View>
      <View style={styles().powerButtonView}>
        <ColorPicker
          color={pickerColor}
          defaultColor={toHsv(color)}
          onColorChange={onPickerColorChange}
          onColorSelected={onPickerColorSelected}
          hideSliders={true}
          style={{ flex: 1 }}
        />
      </View>

      <View style={styles().brightnessView}>
        <Text style={styles().lightText}>Brightness: </Text>
        <Text style={styles().lightText}>slider</Text>
        <Text style={styles().lightText}>{brightness}</Text>
      </View>
    </View>
  );
}

const styles = (power = false, color = colors.active) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      marginVertical: 5,
    },
    detailsView: {
      flexDirection: "row",
      alignItems: "center",
    },
    lightText: {
      fontWeight: "bold",
      fontSize: 18,
      color: colors.primaryText,
    },
    stateText: {
      fontWeight: "bold",
      fontSize: 18,
      color: power ? color : colors.desactive,
    },
    powerButtonView: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    // powerButton: {
    //   padding: 15,
    //   backgroundColor: colors.white,
    //   borderRadius: 100,
    //   shadowColor: colors.gray,
    //   shadowOffset: { width: 0, height: 3 },
    //   shadowOpacity: 0.1,
    //   shadowRadius: 3.5,
    //   elevation: 2,
    // },
    // powerButtonOppacity: {
    //   padding: 20,
    //   backgroundColor: power ? colors.active : colors.desactive,
    //   borderRadius: 100,
    // },
    brightnessView: {
      flexDirection: "row",
      alignItems: "center",
    },
  });
