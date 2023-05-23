import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { ColorPicker, toHsv, fromHsv } from "react-native-color-picker";
import Slider from "react-native-a11y-slider";

import DevicesContext from "../../contexts/DevicesContext";

import LineIcon from "react-native-vector-icons/SimpleLineIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import colors from "../../../configs/colors";
import api from "../../api/api";

export default function LightBulbRGBDetails({
  uid,
  power,
  color, // in hex format
  brightness,
  powerHandler,
}) {
  const stateText = power ? "On" : "Off";
  const timeout = 300;

  const [disabled, setDisabled] = React.useState(false);
  const [pickerColor, setPickerColor] = useState(toHsv(color));
  const [sliderValue, setSliderValue] = useState(brightness);

  const { updateDevice } = useContext(DevicesContext);

  // Turn on/off the device (click middle button of the color picker)
  const onPickerColorSelected = (_) => {
    if (disabled) return;
    powerHandler(power, setDisabled);
  };

  useEffect(() => {
    if (!power) return;
    let colorTimeoutId;

    // Change color - after 300ms of no change
    const colorHandler = () => {
      clearTimeout(colorTimeoutId);
      colorTimeoutId = setTimeout(() => {
        if (color == fromHsv(pickerColor)) return;

        const selectedColor = fromHsv(pickerColor);
        console.log(`Changing color device... ${selectedColor}`);

        api.actionSetColorDevice(uid, selectedColor).then((deviceUpdated) => {
          if (deviceUpdated != null) {
            console.log(`Changed light color successfully`);
            updateDevice(deviceUpdated, uid);
            return;
          }

          setPickerColor(toHsv(color));
          console.log("Failed to change light color");
        });
      }, timeout);
    };

    colorHandler();

    return () => {
      clearTimeout(colorTimeoutId);
    };
  }, [pickerColor]);

  useEffect(() => {
    if (!power) return;
    let brightnessTimeoutId;

    // Change brightness - after 500ms of no change
    const brightnessHandler = () => {
      clearTimeout(brightnessTimeoutId);
      brightnessTimeoutId = setTimeout(() => {
        if (brightness == sliderValue) return;

        const selectedBrightness = sliderValue;
        console.log(`Changing brightness device... ${selectedBrightness}`);

        api
          .actionSetBrightnessDevice(uid, selectedBrightness)
          .then((deviceUpdated) => {
            if (deviceUpdated != null) {
              console.log(`Changed light brightness successfully`);
              updateDevice(deviceUpdated, uid);
              return;
            }

            setSliderValue(brightness);
            console.log("Failed to change light brightness");
          });
      }, timeout);
    };

    brightnessHandler();

    return () => {
      clearTimeout(brightnessTimeoutId);
    };
  }, [sliderValue]);

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
        {power && (
          <ColorPicker
            color={pickerColor}
            defaultColor={toHsv(color)}
            onColorChange={(color) => setPickerColor(color)}
            onColorSelected={onPickerColorSelected}
            hideSliders={true}
            style={{ flex: 1 }}
          />
        )}

        <TouchableOpacity
          style={styles(power, color).powerIconOpacity}
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
          color={power ? colors.primaryText : colors.white}
        />
        {power && (
          <Slider
            min={1}
            max={100}
            values={[sliderValue]}
            markerColor={colors.primaryText}
            trackStyle={styles().trackBrightnessSlider}
            showLabel={false}
            onChange={(values) => setSliderValue(values[0])}
          />
        )}
        <Text style={styles().lightText}>{power ? sliderValue : ""}</Text>
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
      padding: 22,
    },
    powerIconOpacity: {
      position: "absolute",
      alignSelf: "center",
      backgroundColor: power ? "transparent" : colors.desactive,
      borderRadius: 100,
      padding: 20,
    },
    brightnessView: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: "80%",
    },
  });
