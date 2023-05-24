import React from "react";
import {
  StyleSheet,
  Text,
  Platform,
  Modal,
  View,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import LoadingSpinner from "../../components/LoadingSpinner";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../../../configs/colors";

//INFO icon names: close, check and ellipsis1

export default function TitleModal({
  visible,
  title,
  leftIcon,
  rightIcon,
  leftIconCallback,
  rightIconCallback,
  modalContent,
  contextMenu,
  isLoading = false,
}) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      {/*TODO: remove the transparent view when we get the bottom page to be darker*/}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, backgroundColor: colors.transparentGray }}>
            <LoadingSpinner isLoading={isLoading} />
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
              {contextMenu}
              <View style={styles.modalBody}>{modalContent}</View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
