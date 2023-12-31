import React, { useContext } from "react";
import TitleModal from "../../components/modal/TitleModal";
import ModalsContext from "../../contexts/ModalsContext";
import DivisionsContext from "../../contexts/DivisionsContext";
import AddDivisionContext from "../../contexts/AddDivisionContext";
import AddDivisionForm from "../../components/division_form/AddDivisionForm";
import DevicesContext from "../../contexts/DevicesContext";

import utils from "../../utils/utils";
import api from "../../api/api";

export default function AddDivisionModal() {
  const { addDivision } = useContext(DivisionsContext);
  const { setDevices } = useContext(DevicesContext);

  const {
    addDivisionFormModalVisible,
    setAddDivisionFormModalVisible,
    isDivisionFormModalLoading,
    setIsDivisionFormModalLoading,
  } = useContext(ModalsContext);

  const {
    divisionName,
    divisionIcon,
    selectedDevices,
    resetAddDivisionContext,
  } = useContext(AddDivisionContext);

  const requiredFields = [
    { field: divisionName, message: "Division name is required." },
    { field: divisionIcon, message: "Division icon is required." },
  ];

  const fetchDevices = async () => {
    const devs = await api.getDevices();
    if (devs != null) setDevices(devs);
  };

  const checkRequiredFields = () => {
    for (let i = 0; i < requiredFields.length; i++) {
      if (!requiredFields[i].field) {
        utils.showErrorMessage(requiredFields[i].message);
        return false;
      }
    }
    return true;
  };

  const createDivision = async () => {
    if (!checkRequiredFields()) return;

    const division = {
      name: divisionName,
      icon: divisionIcon,
      devices: selectedDevices,
    };

    console.log("Adding division...");
    setIsDivisionFormModalLoading(true);
    const newDivision = await api.addDivision(division);
    setIsDivisionFormModalLoading(false);
    if (newDivision != null) {
      addDivision(newDivision);
      fetchDevices();
      setAddDivisionFormModalVisible(false);
      resetAddDivisionContext();
      console.log("Division added successfully");
    } else {
      console.log("Failed to create division");
      utils.showErrorMessage("Failed to create division");
    }
  };

  return (
    <TitleModal
      title={"Add Division"}
      subtitle={"Subtitulo"}
      visible={addDivisionFormModalVisible}
      leftIcon="close"
      rightIcon="check"
      leftIconCallback={() => {
        setAddDivisionFormModalVisible(false);
      }}
      rightIconCallback={() => createDivision()}
      modalContent={<AddDivisionForm />}
      isLoading={isDivisionFormModalLoading}
    />
  );
}
