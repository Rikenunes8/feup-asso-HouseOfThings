import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../../../configs/colors";
import AddDivisionModal from "../../screens/modals/AddDivisionModal";
import ModalsContext from "../../contexts/ModalsContext";

export default function NewDivisionCard() {
  const { setAddDivisionFormModalVisible } = useContext(ModalsContext);

  return (
    <>
      <TouchableOpacity
        style={styles.divisionCard}
        onPress={() => setAddDivisionFormModalVisible(true)}
      >
        <Icon name={"plus"} size={35} color={colors.primaryText} />
      </TouchableOpacity>
      <AddDivisionModal />
    </>
  );
}

const styles = StyleSheet.create({
  divisionCard: {
    width: 130,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.transparent,
    borderRadius: 15,
    marginVertical: 10,
    padding: 10,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: colors.primaryText,
  },
});
