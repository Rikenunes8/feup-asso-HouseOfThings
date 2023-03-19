import React, { useContext } from "react";
import DetailsModal from "../components/DetailsModal";
import AddDeviceForm from "../components/device_form/AddDeviceForm";
import DevicesContext from "../contexts/DevicesContext";

import api from "../api/api";

export default function AddDeviceModal({
  modalVisible,
  setModalVisible,
  type,
}) {
  const { addDevice } = useContext(DevicesContext);
  const [name, setName] = React.useState("");
  const [value, setValue] = React.useState(null);

  return (
    <DetailsModal
      title={type
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")} //TODO
      modalVisible={modalVisible}
      leftIcon="close"
      rightIcon="check"
      leftIconCallback={() => {
        setModalVisible(false);
      }}
      rightIconCallback={() => {
        if (type === "light bulb") {
          console.log(`Adding ${type}...`);

          // TODO: remove hardcoded
          api.addDevice("1").then((success) => {
            success
              ? addDevice({
                  uid: "1",
                  name: name,
                  division: value,
                  enabled: false,
                })
              : console.log("Failed to add device");
          });
        }
      }}
      modalContent={
        <AddDeviceForm
          name={name}
          value={value}
          setName={setName}
          setValue={setValue}
        />
      }
    />
  );
}
