import DeviceCard from "./DeviceCard";
import LightBulbCard from "./LightBulbCard";
import LightBulbRGBCard from "./LightBulbRGBCard";
import ThermometerCard from "./ThermometerCard";

export default function DeviceCardPicker({ device }) {
  switch (device.subcategory) {
    case "light bulb":
      return <LightBulbCard device={device} />;
    case "light bulb rgb":
      return <LightBulbRGBCard device={device} />;
    case "thermometer":
      return <ThermometerCard device={device} />;
    default:
      return <DeviceCard device={device} />;
  }
}
