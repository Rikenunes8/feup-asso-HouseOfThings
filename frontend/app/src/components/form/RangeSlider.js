import React from "react";
import Slider from "react-native-a11y-slider/dist";
import CustomMarker from "./CustomMarker";

import colors from "../../../configs/colors";

export default function RangeSlider({ setValue, values }) {
  return (
    <Slider
      min={1}
      max={100}
      values={values}
      markerComponent={CustomMarker}
      trackStyle={{ color: colors.primary }}
      onChange={(newValues) => setValue(newValues)}
    />
  );
}
