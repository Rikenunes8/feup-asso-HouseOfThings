import React, {useState} from "react";
import {
  StyleSheet,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../../configs/colors";
import TitleModal from "./modal/TitleModal";
import AddDivisionForm from "../components/division_form/AddDivisionForm"


export default function DivisionCard({ division }) {
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);

  return (
    <TouchableOpacity
      style={styles.divisionCard}
       onPress={() => setIsDetailsModalVisible(!isDetailsModalVisible)}
    >
      <TitleModal
        title={"Add Division"}
        subtitle={"Subtitulo"}
        visible={isDetailsModalVisible}
        leftIcon="close"
        rightIcon="check"
        leftIconCallback={() => {setIsDetailsModalVisible(false)}}
        rightIconCallback={() => console.log("Create Division")}
        modalContent={
          <AddDivisionForm />
        } 
      />      
      <Icon name={"plus"} size={35} color={colors.primaryText} />
    </TouchableOpacity>
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
