import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { ColorPicker, toHsv, fromHsv } from "react-native-color-picker";
import Slider from "react-native-a11y-slider";

import LineIcon from "react-native-vector-icons/SimpleLineIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import colors from "../../../configs/colors";

export default function LightBulbRGBDetails({
  power,
  color, // in hex format
  brightness,
  powerHandler,
}) {
  const stateText = power ? "On" : "Off";

  const [disabled, setDisabled] = React.useState(false);
  const [pickerColor, setPickerColor] = useState(toHsv(color));
  const [sliderValue, setSliderValue] = useState(brightness);

  // Turn on/off the device (click middle button of the color picker)
  const onPickerColorSelected = (_) => {
    if (disabled) return;
    powerHandler(power, setDisabled);
  };

  // Set color of the device (some time after the color picker has is last change)
  // actionDevice(device.uid, { action: "set_color", "data": { "color": color (hex ?) } })
  const onPickerColorChange = (color) => {
    console.log(`Color changed: ${fromHsv(color)}`);
    setPickerColor(color);
    // apos x tempo sem change -> fazer o handle de change da cor ao server (pela api)
  };

  // Set brightness of the device (some time after the slider has is last change)
  // actionDevice(device.uid, { action: "set_brightness", "data": { "brightness": int } })
  const onSliderChange = (values) => {
    console.log(`Brightness changed: ${values[0]}`);
    setSliderValue(values[0]);
    // apos x tempo sem change -> fazer o handle de change da brigtness ao server (pela api)
  };

  const brightnessIconName = (brightness) => {
    if (brightness < 40) return "brightness-low";
    if (brightness < 80) return "brightness-medium";
    return "brightness-high";
  };

  return (
    <View style={styles().container}>
      <View style={styles().detailsView}>
        <Text style={styles().lightText}>Light: </Text>
        <Text style={styles(power, fromHsv(pickerColor)).stateText}>
          {stateText}
        </Text>
      </View>

      <View style={styles().colorPickerView}>
        <ColorPicker
          color={pickerColor}
          defaultColor={toHsv(color)}
          onColorChange={onPickerColorChange}
          onColorSelected={onPickerColorSelected}
          hideSliders={true}
          style={{ flex: 1 }}
        />
        <TouchableOpacity
          style={styles().powerIconOpacity}
          onPress={() => powerHandler(power, setDisabled)}
          disabled={disabled}
        >
          <LineIcon name="power" size={50} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles().brightnessView}>
        <MaterialIcon
          name={brightnessIconName(sliderValue)}
          size={20}
          color={colors.primaryText}
        />
        <Slider
          min={1}
          max={100}
          values={[sliderValue]}
          markerColor={colors.primaryText}
          trackStyle={styles().trackBrightnessSlider}
          showLabel={false}
          onChange={onSliderChange}
        />
        <Text style={styles().lightText}>{sliderValue}</Text>
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
    colorPickerView: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    powerIconOpacity: {
      position: "absolute",
      alignSelf: "center",
      padding: 20,
    },
    brightnessView: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: "80%",
    },
  });
