import React from "react";
import {
  StyleSheet,
  Text,
  Platform,
  Modal,
  View,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../../configs/colors";

//INFO icon names: close, check and ellipsis1

export default function AddModal({
  title,
  modalVisible,
  leftIcon,
  rightIcon,
  leftIconCallback,
  rightIconCallback,
  modalContent,
}) {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      {/*TODO: remove the transparent view when we get the bottom page to be darker*/}
      <View style={{ flex: 1, backgroundColor: colors.transparentGray }}>
        <View style={styles.modalView}>
          <View style={styles.iconsView}>
            {leftIcon ? (
              <TouchableOpacity onPress={leftIconCallback}>
                <Icon
                  name={leftIcon}
                  size={30}
                  color={colors.white}
                  style={styles.leftIcon}
                />
              </TouchableOpacity>
            ) : null}
            {rightIcon ? (
              <TouchableOpacity onPress={rightIconCallback}>
                <Icon
                  name={rightIcon}
                  size={30}
                  color={colors.white}
                  style={styles.rightIcon}
                />
              </TouchableOpacity>
            ) : null}
          </View>
          <Text style={styles.modalTitle}>{title}</Text>

          <View style={styles.modalBody}>{modalContent}</View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  iconsView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftIcon: {
    marginLeft: 25,
    marginBottom: 15,
  },
  rightIcon: {
    marginRight: 25,
    marginBottom: 15,
    alignSelf: "flex-end",
  },
  modalView: {
    backgroundColor: colors.primary,
    flex: 1,
    marginTop: Platform.OS === "android" ? "15%" : "30%",
    justifyContent: "flex-end",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  modalBody: {
    backgroundColor: colors.white,
    flex: 0.97,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  modalTitle: {
    color: colors.white,
    fontSize: 27,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 15,
  },
});
