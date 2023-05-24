import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import ModalsContext from "../../contexts/ModalsContext";
import CreateRuleModal from "../../screens/modals/CreateRuleModal";

import colors from "../../../configs/colors";

export default function NewRuleCard({}) {
  const { createRuleModalVisible, setCreateRuleModalVisible } =
    useContext(ModalsContext);

  return (
    <View>
      <CreateRuleModal />
      <TouchableOpacity
        style={styles.card}
        onPress={() => setCreateRuleModalVisible(!createRuleModalVisible)}
      >
        <Icon name={"plus"} size={25} color={colors.primaryText} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.transparent,
    borderColor: colors.primaryText,
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    padding: 20,
  },
});
