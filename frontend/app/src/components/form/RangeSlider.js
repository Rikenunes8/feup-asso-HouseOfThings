import React from "react";
import Slider from "react-native-a11y-slider/dist";
import CustomMarker from "./CustomMarker";

import colors from "../../../configs/colors";

export default function RangeSlider({ setValue, name }) {
  return (
    <Slider
      min={0}
      max={100}
      values={[50, 80]}
      markerComponent={CustomMarker}
      trackStyle={{ color: colors.primary }}
      onChange={(e) => setValue(e, name)}
    />
  );
}
