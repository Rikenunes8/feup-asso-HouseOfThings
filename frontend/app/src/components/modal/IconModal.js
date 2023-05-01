import React from "react";
import {
  StyleSheet,
  Text,
  Modal,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import LoadingSpinner from "../../components/LoadingSpinner";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../../../configs/colors";
import utils from "../../utils/utils";

//INFO detailsIcon names: close, check and ellipsis1

export default function IconModal({
  visible,
  title,
  titleEditable = false,
  titleOnChangeCallback,
  titleRef,
  subtitle,
  leftIcon,
  rightIcon,
  leftIconCallback,
  rightIconCallback,
  icon,
  type,
  contextMenu,
  modalContent,
  inputOnFocus,
  isLoading = false,
}) {

  function displayIcon() {
    if(inputOnFocus) return null;

    switch(type) {
      case "device":
        return utils.getDeviceImg(icon);
      case "division":
        return utils.getDivisionImg(icon);
      default:
        return utils.getDeviceImg(icon);
    }
  }

  return ( 
    <Modal animationType="slide" transparent={true} visible={visible}>
      {/*TODO: remove the transparent view when we get the bottom page to be darker*/}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <LoadingSpinner isLoading={isLoading} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView
            style={{ flex: 1, backgroundColor: colors.transparentGray }}
          >
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
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

                <View style={styles.detailsView}>
                  <View style={styles.detailsInfo}>
                    <View style={styles.detailsTitleSection}>
                      {!titleEditable ? null : (
                        <Icon
                          style={styles.detailsTitleEditIcon}
                          name="edit"
                          size={20}
                          color={colors.white}
                        />
                      )}
                      <TextInput
                        ref={titleRef}
                        value={title}
                        editable={titleEditable}
                        maxLength={40}
                        onChangeText={(title) => titleOnChangeCallback(title)}
                        style={styles.detailsTitle}
                      />
                    </View>
                    <Text style={styles.detailsSubtitle}>{subtitle}</Text>
                  </View>
                  {displayIcon()}
                </View>
                {contextMenu}
              </View>
              <View style={styles.modalBody}>{modalContent}</View>
            </View>
          </SafeAreaView>
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
    position: "relative",
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
  detailsIcon: {
    width: 180, // TODO: make this relative to the screen size ??
    height: 180, // TODO: make this relative to the screen size ??
    resizeMode: "contain",
    alignSelf: "flex-end",
  },
  detailsInfo: {
    flexDirection: "column",
  },
  detailsSubtitle: {
    color: colors.white,
    fontSize: 20,
  },
  detailsTitle: {
    color: colors.white,
    fontSize: 27,
    fontWeight: "bold",
  },
  detailsTitleEditIcon: {
    marginRight: 10,
  },
  detailsTitleSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsView: {
    flex: 0.55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  modalView: {
    backgroundColor: colors.primary,
    flex: 1,
    marginTop: "15%",
    justifyContent: "flex-end",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  modalBody: {
    backgroundColor: colors.white,
    flex: 0.5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
  },
  modalHeader: {
    flex: 0.5,
    justifyContent: "space-around",
  },
});
