import React, { useContext } from "react";

import ContextMenu from "../ContextMenu";
import DivisionsContext from "../../contexts/DivisionsContext";
import ModalsContext from "../../contexts/ModalsContext";

import colors from "../../../configs/colors";
import api from "../../api/api";
import utils from "../../utils/utils";

export default function DivisionChangingIconContextMenu({
  isContextMenuVisible,
  setIsContextMenuVisible,
  divisionContextMenuId,
  resetDivisionContextMenuName,
}) {
  const { updateDivision } = useContext(DivisionsContext);

  const { setIsDivisionDetailsModalLoading, setIsMenuModalChangeIcon } =
    useContext(ModalsContext);

  const saveCallback = () => {
    console.log("Changing Icon division...");

    /*
    setIsDivisionDetailsModalLoading(true);
    
    api
      .renameDivision(divisionContextMenuId, divisionContextMenuName)
      .then((success) => {
        setIsDivisionDetailsModalLoading(false);
        setIsContextMenuVisible(false);
        setIsMenuModalChangeIcon(false);

        if (success) {
          console.log("Division renamed successfully");
          renameDivision(divisionContextMenuId, divisionContextMenuName);
          return;
        }

        console.log("Failed to rename division");
        utils.showErrorMessage("Failed to rename division");
        resetDivisionContextMenuName();
      });
    */
  };

  const cancelCallback = () => {
    setIsContextMenuVisible(false);
    setIsMenuModalChangeIcon(false);
  };

  return (
    <ContextMenu
      isContextMenuVisible={isContextMenuVisible}
      setIsContextMenuVisible={setIsContextMenuVisible}
      options={[
        {
          name: "Save",
          icon: "save",
          color: colors.active,
          callback: saveCallback,
        },
        {
          name: "Cancel",
          icon: "slash",
          color: colors.red,
          callback: cancelCallback,
        },
      ]}
    />
  );
}
